import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useGroupMemberItem } from "./useGroupMemberItem";
import { useStyle } from "./useStyle";

export const GroupMemberItem = ({ item }: { item: any }) => {
  const { exploreItem, actionButton } = useStyle();
  const { handleRemoveUser, isRemoveUserPending } = useGroupMemberItem();

  return (
    <div key={item._id}>
      <Stack direction={"row"} sx={exploreItem}>
        <Box border={"2px"}>
          <Avatar
            sx={{ bgcolor: "gray", width: 46, height: 46 }}
            aria-label="recipe"
            sizes="large"
            src={item.avatar}
          >
            {"J"}
          </Avatar>
        </Box>

        <Stack width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack width={"50%"}>
              <Typography
                variant="body1"
                fontWeight={600}
                color={"text.primary"}
                textTransform={"capitalize"}
              >
                {item.fullName}
              </Typography>
              <Typography
                variant="body2"
                color={"text.secondary"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {item.email}
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={2}>
              <Button
                variant="outlined"
                color={"error"}
                size="small"
                sx={actionButton}
                disabled={isRemoveUserPending}
                onClick={(e) => handleRemoveUser(e)}
              >
                {isRemoveUserPending ? "pending..." : "Remove"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Divider />
    </div>
  );
};
