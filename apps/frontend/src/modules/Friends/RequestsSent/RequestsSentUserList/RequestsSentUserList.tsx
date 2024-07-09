import { Stack } from "@mui/material";
import PageLoader from "../../../../components/PageLoader";

import { RequestsSentUserItem } from "./RequestsSentUserItem";
import { useRequestsSentUserList } from "./useRequestsSentUserItem";
import { useStyle } from "./useStyle";

export const RequestsSentUserList = () => {
  const { chatListContainer } = useStyle();

  const { isUserListLoading, usersList } = useRequestsSentUserList();

  return (
    <Stack sx={chatListContainer}>
      {isUserListLoading && <PageLoader />}
      {usersList &&
        usersList?.map((item: any) => {
          return <RequestsSentUserItem item={item} key={item._id} />;
        })}
    </Stack>
  );
};
