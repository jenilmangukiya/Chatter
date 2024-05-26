import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { SEND_FRIEND_REQUEST } from "./ExploreAPIRoutes";

const sendUserRequest = async (data: any) => {
  return await axiosAuth.post(SEND_FRIEND_REQUEST, data);
};

export const useSendFriendRequest = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: sendUserRequest,
    ...queryParams,
  });
