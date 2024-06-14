import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_CHAT_MESSAGES_API } from "./ChatAPIRoutes";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  chatId?: string;
}

const getChatMessages = ({ chatId }: { chatId?: string }) => {
  return axiosAuth.get(GET_CHAT_MESSAGES_API, {
    params: {
      chatId: chatId || "",
    },
  });
};

export const useGetChatMessages = ({
  queryParams,
  chatId,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["ChatMessages", chatId],
    queryFn: () => getChatMessages({ chatId }),
    select: (ele: any) => {
      return ele.data.data;
    },
    ...queryParams,
  });
};
