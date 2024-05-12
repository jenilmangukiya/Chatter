import { Divider, Stack } from "@mui/material";
import { NavLink, useOutlet } from "react-router-dom";
import { ChatCard } from "../../components";
import { ChatPlaceholder, ChatSearch } from "./components";
import { chatsMain } from "./data";
import { useStyle } from "./useStyle";

export const ChatApp = () => {
  const { chatListContainer } = useStyle();
  const outlet = useOutlet();

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack width={"34%"} gap={1}>
        <ChatSearch />
        <Stack sx={chatListContainer}>
          {chatsMain.map((item) => {
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
