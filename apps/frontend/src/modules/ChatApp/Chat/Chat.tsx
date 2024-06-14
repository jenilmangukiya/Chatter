import { Stack } from "@mui/material";
import { useAuth } from "../../../Auth";
import PageLoader from "../../../components/PageLoader";
import { ChatHeader, Message, SendChatActions } from "./components";
import { useChat } from "./useChat";

export const Chat = () => {
  const {
    chatData,
    isChatLoading,
    isChatError,
    chatMessages,
    isChatMessagesLoading,
  } = useChat();
  const { user } = useAuth();

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
          direction={"column-reverse"}
          gap={1}
          sx={{ overflowY: "scroll" }}
        >
          {isChatMessagesLoading && <PageLoader />}
          {!isChatMessagesLoading &&
            chatMessages?.docs &&
            chatMessages?.docs?.map((item: any) => {
              return (
                <Message
                  key={item._id}
                  message={item.content}
                  fromSender={item.sender !== user.userId}
                  time={item.createdAt}
                  username={item.username}
                  avatar={item.avatar}
                />
              );
            })}
        </Stack>
        <SendChatActions
          chatMembers={chatData?.users
            .filter((item: any) => item._id !== user.userId)
            .map((item: any) => item?._id)}
        />
      </Stack>
    );
};
