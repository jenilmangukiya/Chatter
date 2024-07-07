import { Avatar, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../../../../Auth";
import PageLoader from "../../../PageLoader";
import { GroupMemberItem } from "./components";
import { useGroupProfile } from "./useGroupProfile";

export const GroupProfile = () => {
  const { user } = useAuth();
  const { handleOnRemoveClick, chatData, isChatDataLoading } =
    useGroupProfile();

  if (isChatDataLoading) {
    return <PageLoader />;
  }

  console.log("chatData", chatData);

  return (
    <Stack
      p={3}
      py={2}
      bgcolor={"white"}
      borderRadius={"16px"}
      alignItems={"center"}
      height={"calc(100% - 72px - 24px)"}
      direction={"row"}
    >
      <Stack direction={"column"} alignItems={"center"} gap={3} width={"50%"}>
        <Avatar
          sx={{ bgcolor: red[500], width: 170, height: 170, mx: "auto" }}
          aria-label="recipe"
          sizes="large"
        >
          <Typography variant="h1">{chatData?.groupTitle[0]}</Typography>
        </Avatar>
        <Typography variant="h4" fontWeight={600}>
          {chatData?.groupTitle}
        </Typography>
      </Stack>
      <Stack height={"100%"} width={"50%"}>
        <Typography variant="h6" fontWeight={600}>
          Group Members
        </Typography>
        <Stack overflow={"scroll"} sx={{ scrollbarWidth: "none" }}>
          {chatData?.users
            ?.filter((item: any) => item._id !== user.userId)
            .map((item: any) => {
              return (
                <GroupMemberItem
                  item={item}
                  onRemoveClick={handleOnRemoveClick}
                />
              );
            })}
        </Stack>
      </Stack>
    </Stack>
  );
};
