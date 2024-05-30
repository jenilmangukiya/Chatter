import { Stack, Typography } from "@mui/material";
import { RequestsSentUserList } from "./RequestsSentUserList";

export const RequestsSent = () => {
  return (
    <Stack gap={1} position={"static"} height={"100%"}>
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
            <Typography variant="h5" fontWeight={600}>
              Friend Requests sent
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        borderRadius={"16px"}
        bgcolor={"white"}
        height={"calc(100vh - 64px - 100px)"}
        p={2}
        direction={"column"}
        gap={1}
        sx={{ overflowY: "scroll" }}
      >
        <RequestsSentUserList />
      </Stack>
    </Stack>
  );
};
