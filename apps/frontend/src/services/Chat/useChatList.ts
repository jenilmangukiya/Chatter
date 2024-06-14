import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_CHAT_LIST_API } from "./ChatAPIRoutes";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  searchText?: string;
  userId: string;
}

const getChatList = ({ searchText }: { searchText?: string }) => {
  return axiosAuth.get(GET_CHAT_LIST_API, {
    params: {
      query: searchText,
    },
  });
};

export const useChatList = ({
  queryParams,
  searchText,
  userId,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["ChatList", searchText],
    queryFn: () => getChatList({ searchText }),
    select: (ele: any) => {
      const data = ele.data.data;
      return data.map((item: any) => {
        if (item.isGroupChat) {
          return {
            id: item._id,
            title: item?.groupTitle || "unnamed Group",
            last_message: "",
            last_message_time: "",
            unreadMessage: 0,
            isGroup: true,
            totalMembers: item.users.length,
          };
        } else {
          const sender = item.users.find((i: any) => i._id !== userId);
          return {
            id: item._id,
            title: sender.fullName || "",
            last_message: "",
            last_message_time: "",
            unreadMessage: 0,
            isGroup: false,
            totalMembers: 0,
            avatar: sender.avatar,
          };
        }
      });
    },
    ...queryParams,
  });
};
