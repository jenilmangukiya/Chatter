import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { DELETE_CHAT_API } from "./ChatAPIRoutes";

const removeChat = async ({ userId }: { userId: string }) => {
  return await axiosAuth.delete(DELETE_CHAT_API(userId));
};

export const useRemoveChat = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: removeChat,
    ...queryParams,
  });
