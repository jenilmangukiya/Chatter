import { useGetFriendRequest } from "../../../../services";

export const useRequestsSentUserList = () => {
  const { data, isLoading } = useGetFriendRequest({ type: "sent" });
  return {
    isUserListLoading: isLoading,
    usersList: data,
  };
};
