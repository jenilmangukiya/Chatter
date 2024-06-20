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
    isChatMessagesLoading,
    messages,
    hasNextPage,
    observerTarget,
    setMessages,
    setLocalMessages,
  } = useChat();

  const { user } = useAuth();

  if (isChatLoading) {
    return <PageLoader />;
  }
  console.log("messages", messages);
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
          {/* {!isChatMessagesLoading &&
            localMessages?.map((item: any) => {
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
            })} */}
          {!isChatMessagesLoading &&
            messages?.map((item: any) => {
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
          {!isChatMessagesLoading && hasNextPage && (
            <div ref={observerTarget}>
              <Stack alignItems={"center"}>Loading...</Stack>
            </div>
          )}
        </Stack>
        <SendChatActions
          setMessages={setMessages}
          setLocalMessages={setLocalMessages}
          chatMembers={chatData?.users
            .filter((item: any) => item._id !== user.userId)
            .map((item: any) => item?._id)}
        />
      </Stack>
    );
};
