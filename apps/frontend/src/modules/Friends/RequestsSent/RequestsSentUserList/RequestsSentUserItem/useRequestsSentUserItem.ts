import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../../../../components/SnackbarAlert";
import { useCancelFriendRequest } from "../../../../../services";

export const useRequestsSentUserItem = () => {
  const queryClient = useQueryClient();

  const { setSnackbarConfig } = useSnackbar();

  const { mutate, isPending: isCancelRequestPending } = useCancelFriendRequest({
    onSuccess: (e) => {
      setSnackbarConfig({
        message: "Request canceled successfully",
        open: true,
        severity: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["requests", "sent"] });
    },
    onError: (e: any) => {
      setSnackbarConfig({
        message: e.response.data.message,
        open: true,
        severity: "error",
      });
    },
  });

  const handleCancelFriendRequest = async (
    event: React.MouseEvent<HTMLElement>,
    requestId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await mutate(requestId);
  };

  return {
    handleCancelFriendRequest,
    isCancelRequestPending,
  };
};
