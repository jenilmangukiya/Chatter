import { Stack } from "@mui/material";
import PageLoader from "../../../../components/PageLoader";
import { FriendRequestUserItem } from "./FriendRequestUserItem";

import { useFriendRequestUserList } from "./useFriendRequestUserList";
import { useStyle } from "./useStyle";

export const FriendRequestUserList = () => {
  const { chatListContainer } = useStyle();

  const { isUserListLoading, usersList } = useFriendRequestUserList();

  return (
    <Stack sx={chatListContainer}>
      {isUserListLoading && <PageLoader />}
      {usersList &&
        usersList?.map((item: any) => {
          return <FriendRequestUserItem item={item} />;
        })}
    </Stack>
  );
};
