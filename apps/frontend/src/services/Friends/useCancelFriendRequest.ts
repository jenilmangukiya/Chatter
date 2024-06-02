import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { CANCEL_FRIEND_REQUEST } from "./FriendsAPIRoutes";

const cancelUserRequest = async (requestId: any) => {
  return await axiosAuth.delete(CANCEL_FRIEND_REQUEST(requestId));
};

export const useCancelFriendRequest = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: cancelUserRequest,
    ...queryParams,
  });
