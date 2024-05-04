import { Box, Stack } from "@mui/material";
import React from "react";
import { Sidebar } from "./components";
import { ChatSearch } from "./components/ChatSearch";

export const ChatApp = () => {
  return (
    <Box padding={4} bgcolor={"#eeeeee"}>
      <Stack direction={"row"} gap={1}>
        <Sidebar />
        <Stack direction={"row"} width={"100%"} gap={1}>
          <Stack width={"34%"} gap={1}>
            <ChatSearch />
            <Stack
              p={3}
              bgcolor={"white"}
              borderRadius={"16px"}
              position={"static"}
              height={"100%"}
            >
              Peoples
            </Stack>
          </Stack>
          <Stack flex={1} gap={1}>
            <Stack
              p={3}
              bgcolor={"white"}
              borderRadius={"16px"}
              height={"100px"}
            >
              Profile Overview
            </Stack>
            <Stack
              p={3}
              bgcolor={"white"}
              borderRadius={"16px"}
              position={"static"}
              height={"100%"}
            >
              Chat
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
