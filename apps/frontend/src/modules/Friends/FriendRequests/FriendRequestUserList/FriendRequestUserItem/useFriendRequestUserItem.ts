import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../../../../components/SnackbarAlert";
import { useCancelFriendRequest } from "../../../../../services";

export const useFriendRequestUserItem = () => {
  const queryClient = useQueryClient();

  const { setSnackbarConfig } = useSnackbar();

  const { mutate: mutateCancelRequest, isPending: isCancelRequestPending } =
    useCancelFriendRequest({
      onSuccess: (e) => {
        setSnackbarConfig({
          message: "Request Successfully removed",
          open: true,
          severity: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["requests", "received"] });
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
    requestId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await mutateCancelRequest(requestId);
  };

  return {
    handleSendFriendRequest,
    isCancelRequestPending,
  };
};
