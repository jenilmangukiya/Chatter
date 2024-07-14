import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { useSnackbar } from "../../components";
import { APPROVE_FRIEND_REQUEST } from "./FriendsAPIRoutes";

const approveUserRequest = async (requestId: any) => {
  return await axiosAuth.post(APPROVE_FRIEND_REQUEST(requestId));
};

export const useApproveFriendRequest = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) => {
  const { setSnackbarConfig } = useSnackbar();
  return useMutation<any, AxiosError, any>({
    mutationFn: approveUserRequest,
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
