"use server";

import { ObjectId } from "mongodb";

import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = new ObjectId();
    const username = `guest-${Math.floor(Math.random() * 100000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);
  if (!host) {
    throw new Error("Host not found");
  }

  const isBlocked = await isBlockedByUser(host.id);
  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `Host-${self.id}` : self.id.toString(),
      name: self.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
