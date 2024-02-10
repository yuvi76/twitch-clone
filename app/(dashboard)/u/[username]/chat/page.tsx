import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Chat</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          value={stream.isChatEnabled}
          lable="Enable Chat"
        />
        <ToggleCard
          field="isChatDelayed"
          value={stream.isChatDelayed}
          lable="Delay Chat"
        />
        <ToggleCard
          field="isChatFollowersOnly"
          value={stream.isChatFollowersOnly}
          lable="Followrs Only Chat"
        />
      </div>
    </div>
  );
};

export default ChatPage;
