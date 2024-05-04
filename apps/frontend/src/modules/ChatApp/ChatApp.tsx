import { Box, Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import { ChatCard } from "../../components";
import { ChatHeader, SendChatActions, Sidebar } from "./components";
import { ChatSearch } from "./components/ChatSearch";
import { useStyle } from "./useStyle";

export const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const { chatListContainer } = useStyle();
  return (
    <Box padding={4} bgcolor={"#eeeeee"}>
      <Stack direction={"row"} gap={1} height={"calc(100vh - 62px)"}>
        <Sidebar />
        <Stack direction={"row"} width={"100%"} gap={1}>
          <Stack width={"34%"} gap={1}>
            <ChatSearch />
            <Stack sx={chatListContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 5, 6].map((item) => {
                return (
                  <>
                    <ChatCard
                      isActive={item == activeChat}
                      onClick={(item: any) => setActiveChat(item)}
                      item={item}
                    />
                    <Divider variant="middle" />
                  </>
                );
              })}
            </Stack>
          </Stack>
          <Stack flex={1} gap={1}>
            <ChatHeader />
            <Stack gap={1} position={"static"} height={"100%"}>
              <Stack
                borderRadius={"16px"}
                bgcolor={"white"}
                height={"100%"}
                p={2}
              >
                hello
              </Stack>
              <SendChatActions />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
