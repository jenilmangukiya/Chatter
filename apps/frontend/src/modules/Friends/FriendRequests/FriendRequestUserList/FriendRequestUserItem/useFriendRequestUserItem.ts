import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../../../../components/SnackbarAlert";
import {
  useApproveFriendRequest,
  useCancelFriendRequest,
} from "../../../../../services";

export const useFriendRequestUserItem = () => {
  const queryClient = useQueryClient();

  const { setSnackbarConfig } = useSnackbar();

  const { mutate: mutateApproveRequest, isPending: isApproveRequestPending } =
    useApproveFriendRequest({
      onSuccess: (e) => {
        setSnackbarConfig({
          message: "Friend Request Approved",
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

  const { mutate: mutateCancelRequest, isPending: isCancelRequestPending } =
    useCancelFriendRequest({
      onSuccess: (e) => {
        setSnackbarConfig({
          message: "Friend Request removed",
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

  const handleCancelFriendRequest = async (
    event: React.MouseEvent<HTMLElement>,
    requestId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await mutateCancelRequest(requestId);
  };

  const handleApproveFriendRequest = async (
    event: React.MouseEvent<HTMLElement>,
    requestId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await mutateApproveRequest(requestId);
  };

  return {
    handleCancelFriendRequest,
    isCancelRequestPending,
    handleApproveFriendRequest,
    isApproveRequestPending,
  };
};
