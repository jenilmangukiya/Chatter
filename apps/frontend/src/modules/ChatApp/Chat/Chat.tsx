import { Stack } from "@mui/material";
import PageLoader from "../../../components/PageLoader";
import { ChatHeader, Message, SendChatActions } from "./components";
import { useChat } from "./useChat";

export const Chat = () => {
  const { chatData, isChatLoading, isChatError } = useChat();

  if (isChatLoading) {
    return <PageLoader />;
  }

  if (!isChatError)
    return (
      <Stack gap={1} position={"static"} height={"100%"}>
        <ChatHeader chatData={chatData} />

        <Stack
          borderRadius={"16px"}
          bgcolor={"white"}
          height={"calc(100vh - 64px - 100px - 60px)"}
          p={2}
          direction={"column"}
          gap={1}
          sx={{ overflowY: "scroll" }}
        >
          <Message message="Hi" />
          <Message message="How are you" />
          <Message message="can we meet tomorrow?" fromSender={false} />
          <Message message="I was thinking to do a meet today!" />
          <Message message="At what time you will be free today?" />
          <Message message="Hey!" fromSender={false} />
          <Message
            message="Actually i am not available today. 🙂"
            fromSender={false}
          />
          <Message message="can we meet tomorrow?" fromSender={false} />
          <Message message="I am free at that time?" fromSender={false} />
        </Stack>
        <SendChatActions />
      </Stack>
    );
};
