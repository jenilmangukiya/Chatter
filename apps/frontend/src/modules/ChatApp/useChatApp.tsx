import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Auth";
import { useChatList } from "../../services/Chat";
import { useSocket } from "../../socket/useSocket";
import { incrementNewMessageCount } from "../../store/Chat/chatSlice";
import { NEW_MESSAGE_ALERT } from "../../utils/EVENTS";

export const useChatApp = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const dispatch = useDispatch();
  const { id: chatId } = useParams();
  const [searchText, setSearchText] = useState("");

  const { newMessageAlerts } = useSelector((state: any) => state.chat);

  const { data: chatListData, isLoading: isChatListLoading } = useChatList({
    searchText: searchText,
    userId: user.userId,
  });

  const handelNewMessageAlert = useCallback(
    (data: any) => {
      const chatIdFromSocket = data.chatId;

      if (chatId !== chatIdFromSocket)
        dispatch(incrementNewMessageCount(chatIdFromSocket));
    },
    [chatId]
  );

  useEffect(() => {
    socket.on(NEW_MESSAGE_ALERT, handelNewMessageAlert);
    return () => {
      socket.off(NEW_MESSAGE_ALERT, handelNewMessageAlert);
    };
  }, [chatId]);

  const finalChatList =
    !isChatListLoading &&
    chatListData.map((item: any) => {
      const alert = newMessageAlerts.find((i: any) => i.chatId === item.id);
      if (alert) {
        return {
          ...item,
          unreadMessage: alert?.count,
        };
      } else {
        return {
          ...item,
        };
      }
    });

  const handleOnSearch = (text: string) => {
    setSearchText(text);
  };

  return { isChatListLoading, finalChatList, handleOnSearch };
};
