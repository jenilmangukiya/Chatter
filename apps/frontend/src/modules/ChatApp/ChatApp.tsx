import { Divider, Stack } from "@mui/material";
import { NavLink, useOutlet } from "react-router-dom";
import { ChatCard } from "../../components";
import PageLoader from "../../components/PageLoader";
import { ChatPlaceholder, ChatSearch } from "./components";
import { useChatApp } from "./useChatApp";
import { useStyle } from "./useStyle";

export const ChatApp = () => {
  const { chatListContainer } = useStyle();
  const outlet = useOutlet();
  const { chatListData, isChatListLoading } = useChatApp();

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack sx={{ width: { md: "45%", lg: "34%" } }} gap={1}>
        <ChatSearch />
        <Stack sx={chatListContainer}>
          {isChatListLoading && <PageLoader />}
          {!isChatListLoading &&
            chatListData &&
            chatListData.map((item: any) => {
              return (
                <div key={item.id}>
                  <NavLink
                    to={`/chat/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {({ isActive }) => (
                      <ChatCard
                        isActive={isActive}
                        title={item.title}
                        lastMessage={item.last_message}
                        lastMessageTime={item.last_message_time}
                        totalMembers={item?.totalMembers}
                        unreadMessages={item.unreadMessage}
                        isGroup={item.isGroup}
                        avatar={item.avatar}
                        key={item.id}
                      />
                    )}
                  </NavLink>
                  <Divider variant="middle" key={item.id} />
                </div>
              );
            })}
        </Stack>
      </Stack>
      <Stack flex={1} gap={1}>
        {outlet || <ChatPlaceholder />}
      </Stack>
    </Stack>
  );
};
