import { useState } from "react";
import { useGetUsers } from "../../../../../../services";

export const useCreateGroupDialog = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { data: users, isLoading: isUsersLoading } = useGetUsers({
    searchText: searchText,
  });

  return {
    users,
    isUsersLoading,
    searchText,
    setSearchText,
    selectedUsers,
    setSelectedUsers,
  };
};
