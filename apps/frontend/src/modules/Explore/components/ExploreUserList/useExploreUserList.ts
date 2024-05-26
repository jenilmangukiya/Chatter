import { useGetExploreUsers } from "../../../../services";

export const useExploreUserList = ({ searchText }: { searchText: string }) => {
  const { data: usersList, isLoading: isUserListLoading } = useGetExploreUsers({
    searchText: searchText,
  });

  return {
    isUserListLoading,
    usersList,
  };
};
