import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../../../../components/SnackbarAlert";
import { useSendFriendRequest } from "../../../../../services";

export const useFriendRequestUserItem = () => {
  const queryClient = useQueryClient();

  const { setSnackbarConfig } = useSnackbar();

  const { mutate, isPending: isSendRequestPending } = useSendFriendRequest({
    onSuccess: (e) => {
      console.log("e", e);
      setSnackbarConfig({
        message: e.data.message,
        open: true,
        severity: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["exploreUsers"] });
    },
    onError: (e: any) => {
      setSnackbarConfig({
        message: e.response.data.message,
        open: true,
        severity: "error",
      });
    },
  });

  const handleSendFriendRequest = async (
    event: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await mutate({
      userId: userId,
    });
  };

  return {
    handleSendFriendRequest,
    isSendRequestPending,
  };
};
