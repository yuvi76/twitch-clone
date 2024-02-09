import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];
  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    const following = await db.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const blocked = await db.block.findMany({
      where: {
        blockerId: userId,
      },
      select: {
        blockedId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);
    const blockedIds = blocked.map((b) => b.blockedId);

    users = users.filter(
      (u) => !followingIds.includes(u.id) && !blockedIds.includes(u.id)
    );
  } else {
    users = await db.user.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return users;
};
