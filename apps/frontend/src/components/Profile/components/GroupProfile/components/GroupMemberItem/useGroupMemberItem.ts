export const useGroupMemberItem = () => {
  const handleRemoveUser = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    handleRemoveUser,
    isRemoveUserPending: false,
  };
};
