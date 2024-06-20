import { axiosAuth } from "../../Auth";
import { GET_CHAT_MESSAGES_API } from "./ChatAPIRoutes";

export const getChatMessages = ({ pageParam }: any, chatId?: string) => {
  return axiosAuth.get(GET_CHAT_MESSAGES_API, {
    params: {
      chatId: chatId || "",
      page: pageParam.page,
      limit: pageParam.limit,
      sortType: "desc",
    },
  });
};
