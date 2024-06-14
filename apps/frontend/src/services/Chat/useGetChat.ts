import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_CHAT_API } from "./ChatAPIRoutes";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  chatId?: string;
}

const getChat = ({ chatId }: { chatId?: string }) => {
  return axiosAuth.get(GET_CHAT_API(chatId));
};

export const useGetChat = ({
  queryParams,
  chatId,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat({ chatId }),
    select: (ele: any) => ele.data.data,
    ...queryParams,
  });
};
