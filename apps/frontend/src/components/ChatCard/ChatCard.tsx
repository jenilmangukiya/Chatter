import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useStyle } from "./useStyle";

export const ChatCard = ({
  title,
  lastMessage,
  lastMessageTime,
  unreadMessages,
  totalMembers,
  isActive,
  isGroup,
  avatar,
  members,
}: {
  title: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadMessages: number;
  totalMembers?: number;
  isActive: boolean;
  isGroup?: boolean;
  avatar?: string;
  members?: any;
}) => {
  const { notification, container } = useStyle();
  return (
    <Stack direction={"row"} bgcolor={isActive ? "#e9e9e9" : ""} sx={container}>
      {!isGroup && (
        <Avatar
          sx={{ bgcolor: red[500], width: 46, height: 46 }}
          sizes="large"
          src={avatar}
        >
          {title[0]?.toUpperCase()}
        </Avatar>
      )}
      {isGroup && (
        <AvatarGroup max={2} spacing={"medium"} total={totalMembers}>
          {members.map((item: any) => {
            return (
              <Avatar
                alt={item.fullName}
                src="avatar"
                sx={{ bgcolor: red[500] }}
                key={item._id}
              >
                {item.fullName[0].toUpperCase()}
              </Avatar>
            );
          })}

          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      )}
      <Stack width={"100%"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography variant="body1" fontWeight={600} color={"text.primary"}>
            {title}
          </Typography>
          <Typography variant="caption" color={"text.secondary"}>
            {lastMessageTime}
          </Typography>
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="body2" color={"text.secondary"}>
            {lastMessage}
          </Typography>
          {!!unreadMessages && (
            <Stack sx={notification}>{unreadMessages}</Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
