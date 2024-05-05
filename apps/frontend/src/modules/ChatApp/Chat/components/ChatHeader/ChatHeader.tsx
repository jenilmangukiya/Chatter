import { MoreHoriz, Search } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { useStyle } from "./useStyle";

export const ChatHeader = () => {
  const { callButton, profileButton } = useStyle();
  return (
    <Stack p={3} bgcolor={"white"} borderRadius={"16px"} minHeight={"100px"}>
      <Stack
        height={60}
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ cursor: "pointer" }}
      >
        <Stack direction={"row"} gap={2}>
          <Avatar
            sx={{ bgcolor: green[500], width: 46, height: 46 }}
            aria-label="recipe"
            sizes="large"
          >
            J
          </Avatar>
          <Stack>
            <Typography variant="body1" fontWeight={600}>
              John Doe
            </Typography>
            <Typography variant="body2" color={"text.secondary"}>
              John Doe
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Button variant="outlined" sx={profileButton}>
            Profile
          </Button>

          <Button variant="contained" sx={callButton}>
            Call
          </Button>
          <Box height={"32px"}>
            <Divider orientation="vertical" color="gray" />
          </Box>
          <Search />
          <MoreHoriz />
        </Stack>
      </Stack>
    </Stack>
  );
};
