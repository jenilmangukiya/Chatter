import { useAuth } from "../../Auth";
import { useChatList } from "../../services/Chat";

export const useChatApp = () => {
  const { user } = useAuth();
  const { data: chatListData, isLoading: isChatListLoading } = useChatList({
    searchText: "",
    userId: user.userId,
  });

  return { chatListData, isChatListLoading };
};
