import { Stack } from "@mui/material";
import PageLoader from "../../../../components/PageLoader";
import { ExploreUserItem } from "./ExploreUserItem";

import { useExploreUserList } from "./useExploreUserList";
import { useStyle } from "./useStyle";

export const ExploreUserList = ({ searchText }: { searchText: string }) => {
  const { chatListContainer } = useStyle();

  const { isUserListLoading, usersList } = useExploreUserList({
    searchText,
  });

  return (
    <Stack sx={chatListContainer}>
      {isUserListLoading && <PageLoader />}
      {usersList &&
        usersList?.docs.map((item: any) => {
          return <ExploreUserItem item={item} key={item._id} />;
        })}
    </Stack>
  );
};
