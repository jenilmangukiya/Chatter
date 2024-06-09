import { MoreHoriz, Search } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../../../Auth";
import { useStyle } from "./useStyle";

export const ChatHeader = ({ chatData }: { chatData: any }) => {
  const { user } = useAuth();
  const { isGroupChat, users, groupTitle } = chatData;
  const senderUser = users.find((item: any) => item._id !== user.userId);

  const { id } = useParams();
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
          {!isGroupChat && (
            <Avatar
              sx={{ bgcolor: red[500], width: 46, height: 46 }}
              aria-label="recipe"
              sizes="large"
              src={senderUser?.avatar}
            >
              {senderUser?.fullName[0]}
            </Avatar>
          )}
          {isGroupChat && (
            <AvatarGroup
              max={2}
              spacing={"small"}
              total={chatData?.users?.length}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          )}
          <Stack>
            <Link
              to={`/chat/${id}/profile/124234`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                color={"text.primary"}
              >
                {!isGroupChat ? senderUser?.fullName : groupTitle}
              </Typography>
              <Typography variant="body2" color={"text.secondary"}>
                Online
              </Typography>
            </Link>
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Link to={`/chat/${id}/profile`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={profileButton}>
              Profile
            </Button>
          </Link>
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
