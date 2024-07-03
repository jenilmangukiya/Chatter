import { useParams } from "react-router-dom";
import { useAuth } from "../../Auth";
import { useGetChat } from "../../services";

export const useProfile = () => {
  const { id: chatId } = useParams();
  const { user } = useAuth();
  const {
    data: chatData,
    isLoading: isChatDataLoading,
    isError: isChatDataError,
  } = useGetChat({
    chatId: chatId || undefined,
    queryParams: {
      throwOnError: () => {
        return false;
      },
      enabled: !!chatId,
      retry: 1,
      gcTime: 0,
    },
  });

  const isGroupChat = chatData?.isGroupChat;
  const senderUser = chatData?.users?.find(
    (item: any) => item._id !== user.userId
  );

  console.log("senderUser", senderUser);
  return {
    isChatDataLoading,
    chatData,
    isChatDataError,
    senderUser,
    isGroupChat,
    groupTitle: chatData?.groupTitle,
  };
};
