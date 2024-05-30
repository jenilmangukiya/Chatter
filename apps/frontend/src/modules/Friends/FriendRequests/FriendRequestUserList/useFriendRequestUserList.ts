import { useGetFriendRequest } from "../../../../services";

export const useFriendRequestUserList = () => {
  const { data, isLoading } = useGetFriendRequest({ type: "received" });
  return {
    isUserListLoading: isLoading,
    usersList: data,
  };
};
