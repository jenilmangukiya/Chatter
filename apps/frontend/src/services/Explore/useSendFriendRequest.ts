import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { useSnackbar } from "../../components";
import { SEND_FRIEND_REQUEST } from "./ExploreAPIRoutes";

const sendUserRequest = async (data: any) => {
  return await axiosAuth.post(SEND_FRIEND_REQUEST, data);
};

export const useSendFriendRequest = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) => {
  const { setSnackbarConfig } = useSnackbar();
  return useMutation<any, AxiosError, any>({
    mutationFn: sendUserRequest,
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
