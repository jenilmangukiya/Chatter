import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { DELETE_CHAT_DATA_API } from "./ChatAPIRoutes";

const removeChatData = async ({ chatId }: { chatId: string }) => {
  return await axiosAuth.delete(DELETE_CHAT_DATA_API(chatId));
};

export const useRemoveChatData = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: removeChatData,
    ...queryParams,
  });
