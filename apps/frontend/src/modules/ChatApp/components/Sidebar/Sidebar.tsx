import {
  DeleteOutline,
  EmailOutlined,
  MessageOutlined,
  NotificationsOutlined,
  PersonOutline,
} from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { IconButton, Stack } from "@mui/material";
import React from "react";

export const Sidebar = () => {
  return (
    <Stack
      width={"80px"}
      bgcolor={"black"}
      height={"calc(100vh - 62px)"}
      borderRadius={"16px"}
      px={2}
      py={4}
    >
      <Stack
        direction={"column"}
        mx={"auto"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <AutoAwesomeIcon sx={{ color: "primary.main", fontSize: "32px" }} />
        <Stack gap={4}>
          <IconButton aria-label="Profile">
            <EmailOutlined sx={{ color: "white" }} />
          </IconButton>
          <IconButton aria-label="Profile">
            <MessageOutlined sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton aria-label="Profile">
            <NotificationsOutlined sx={{ color: "white" }} />
          </IconButton>
          <IconButton aria-label="Profile">
            <DeleteOutline sx={{ color: "white" }} />
          </IconButton>
        </Stack>
        <IconButton aria-label="Profile">
          <PersonOutline sx={{ color: "white" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
