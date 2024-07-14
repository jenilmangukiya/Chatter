import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { useSnackbar } from "../../components";
import { CANCEL_FRIEND_REQUEST } from "./FriendsAPIRoutes";

const cancelUserRequest = async (requestId: any) => {
  return await axiosAuth.delete(CANCEL_FRIEND_REQUEST(requestId));
};

export const useCancelFriendRequest = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) => {
  const { setSnackbarConfig } = useSnackbar();
  return useMutation<any, AxiosError, any>({
    mutationFn: cancelUserRequest,
    onError: (e: any) => {
      setSnackbarConfig({
        message: e.response.data.message,
        open: true,
        severity: "error",
      });
    },
    ...queryParams,
  });
};
