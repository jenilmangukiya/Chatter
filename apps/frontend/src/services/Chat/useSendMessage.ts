import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { SEND_MESSAGE_API } from "./ChatAPIRoutes";

const sendMessage = async (data: any) => {
  return await axiosAuth.post(SEND_MESSAGE_API, data);
};

export const useSendMessage = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: sendMessage,
    ...queryParams,
  });
