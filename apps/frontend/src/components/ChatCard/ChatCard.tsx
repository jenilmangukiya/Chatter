import { Avatar, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useStyle } from "./useStyle";

export const ChatCard = ({
  item,
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick?: any;
  item: any;
}) => {
  const { notification, container } = useStyle();
  return (
    <Stack
      direction={"row"}
      bgcolor={isActive ? "#e9e9e9" : ""}
      sx={container}
      onClick={() => onClick && onClick(item)}
    >
      <Avatar
        sx={{ bgcolor: red[500], width: 46, height: 46 }}
        aria-label="recipe"
        sizes="large"
      >
        J
      </Avatar>
      <Stack width={"100%"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography variant="body1" fontWeight={600} color={"text.primary"}>
            John Doe
          </Typography>
          <Typography variant="caption" color={"text.secondary"}>
            10:27 AM
          </Typography>
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2" color={"text.secondary"}>
            John Doe
          </Typography>
          <Stack sx={notification}>1</Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
