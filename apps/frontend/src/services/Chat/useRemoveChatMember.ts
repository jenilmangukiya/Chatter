import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { DELETE_CHAT_MEMBER } from "./ChatAPIRoutes";

const removeChatMember = async ({
  chatId,
  memberId,
}: {
  chatId: string;
  memberId: string;
}) => {
  return await axiosAuth.delete(DELETE_CHAT_MEMBER(chatId, memberId));
};

export const useRemoveChatMember = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: removeChatMember,
    ...queryParams,
  });
