import { Avatar, Box, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import moment from "moment";

export const Message = ({
  message = "Hello how are you",
  fromSender = true,
  time = "",
  username = "",
  avatar = "",
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Stack
        sx={{ float: fromSender ? "left" : "right" }}
        alignItems={"center"}
        direction={"row"}
        gap={1}
        justifyContent={"center"}
      >
        {fromSender && (
          <Avatar
            sx={{ bgcolor: red[500], width: 46, height: 46 }}
            aria-label="recipe"
            sizes="large"
            src={avatar}
          >
            {username[0]}
          </Avatar>
        )}
        <Stack alignItems={fromSender ? "flex-start" : "flex-end"}>
          <Typography variant="caption">
            {time && moment(time).fromNow()}
          </Typography>
          <Box
            sx={{
              bgcolor: fromSender ? "#e6e6e6" : "primary.main",
              color: fromSender ? "black" : "white",
              display: "inline-block",
              p: 2,
              borderRadius: 12,
              borderBottomLeftRadius: fromSender ? 0 : "auto",
              borderBottomRightRadius: !fromSender ? 0 : "auto",
            }}
          >
            {message}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
