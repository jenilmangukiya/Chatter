import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../../../../components";
import { useCreateGroup, useGetUsers } from "../../../../../../services";

export const useCreateGroupDialog = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { setSnackbarConfig } = useSnackbar();

  const { data: users, isLoading: isUsersLoading } = useGetUsers({
    searchText: searchText,
  });

  const { mutate: createGroupMutate } = useCreateGroup({
    onError: (e: any) => {
      setSnackbarConfig({
        open: true,
        message: e?.response?.data?.message || "Failed to create Group",
        severity: "error",
      });
    },
    onSuccess(data) {
      const ChatId = data?.data?.data?._id;
      navigate(`/chat/${ChatId}`);
      setSnackbarConfig({
        open: true,
        message: data?.data?.message || "Group created Successfully",
        severity: "error",
      });
    },
  });

  const handleCreateGroupSubmit = () => {
    if (!groupName) {
      setSnackbarConfig({
        message: "Group name is required!",
        open: true,
        severity: "error",
      });
      return;
    }
    if (!selectedUsers || selectedUsers.length < 3) {
      setSnackbarConfig({
        message: "At least three members are required to create a group",
        open: true,
        severity: "error",
      });
      return;
    }

    createGroupMutate({
      groupTitle: groupName,
      members: selectedUsers.map((item: any) => item._id),
    });
  };

  return {
    users,
    isUsersLoading,
    searchText,
    setSearchText,
    selectedUsers,
    setSelectedUsers,
    groupName,
    setGroupName,
    handleCreateGroupSubmit,
  };
};
