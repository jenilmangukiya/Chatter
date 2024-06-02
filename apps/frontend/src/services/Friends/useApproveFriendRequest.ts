import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { APPROVE_FRIEND_REQUEST } from "./FriendsAPIRoutes";

const approveUserRequest = async (requestId: any) => {
  return await axiosAuth.post(APPROVE_FRIEND_REQUEST(requestId));
};

export const useApproveFriendRequest = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: approveUserRequest,
    ...queryParams,
  });
