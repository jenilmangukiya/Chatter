import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../components";
import { getChatMessages, useGetChat } from "../../../services";
import { useRemoveChatData } from "../../../services/Chat/useRemoveChatData";
import { useSocket } from "../../../socket/useSocket";
import { resetNewMessageCount } from "../../../store/Chat/chatSlice";
import { useInfiniteScroll } from "../../../utils";
import {
  MESSAGE_TYPING_START,
  MESSAGE_TYPING_STOP,
  NEW_MESSAGE,
} from "../../../utils/EVENTS";

export const useChat = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const socket = useSocket();

  const dispatch = useDispatch();

  const { setSnackbarConfig } = useSnackbar();

  const { id: chatId } = useParams();
  const [messages, setMessages] = useState<any>([]);
  const [localMessages, setLocalMessages] = useState<any>([]);

  const [isUserTyping, setIsUserTyping] = useState(false);

  useEffect(() => {
    dispatch(resetNewMessageCount(chatId));
  }, []);

  const handelNewMessage = useCallback((data: any) => {
    if (data.chatId === chatId) {
      setIsUserTyping(false);
      setMessages((oldMessages: any) => [data.message, ...oldMessages]);
      setLocalMessages((oldMessages: any) => [data.message, ...oldMessages]);
    }
  }, []);

  const handelMessageTypingStart = useCallback((data: any) => {
    if (data.chatId === chatId) {
      setIsUserTyping(true);
    }
  }, []);

  const handelMessageTypingStop = useCallback((data: any) => {
    if (data.chatId === chatId) {
      setIsUserTyping(false);
    }
  }, []);

  useEffect(() => {
    socket.on(NEW_MESSAGE, handelNewMessage);
    socket.on(MESSAGE_TYPING_START, handelMessageTypingStart);
    socket.on(MESSAGE_TYPING_STOP, handelMessageTypingStop);
    return () => {
      socket.off(NEW_MESSAGE, handelNewMessage);
      socket.off(MESSAGE_TYPING_START, handelMessageTypingStart);
      socket.off(MESSAGE_TYPING_STOP, handelMessageTypingStop);
    };
  }, []);

  const {
    data: chatData,
    isLoading: isChatLoading,
    isError: isChatError,
  } = useGetChat({
    chatId: chatId || undefined,
    queryParams: {
      throwOnError: () => {
        return false;
      },
      enabled: !!chatId,
      retry: 1,
    },
  });

  const {
    data: chatMessages,
    isLoading: isChatMessagesLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", chatId],
    queryFn: (pageParam) => getChatMessages(pageParam, chatId),
    initialPageParam: { page: 1, limit: 20 },
    refetchOnWindowFocus: false,
    getNextPageParam: (res: any) => {
      if (res.data.data.hasNextPage) {
        return {
          page: res.data.data.nextPage,
          limit: 20,
        };
      } else {
        return undefined;
      }
    },
    select: (data: any) => {
      return data;
    },
  });

  const observerTarget = useInfiniteScroll(fetchNextPage);

  useEffect(() => {
    if (chatMessages) {
      const data: any = [];
      chatMessages.pages.forEach((page: any) => {
        const pageItems = page.data.data.docs;
        data.push(...pageItems);
      });
      setMessages([...localMessages, ...data]);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isChatError) {
      setSnackbarConfig({
        message: "An error occurred while fetching the chat.",
        open: true,
        severity: "error",
      });
      navigate("/chat");
    }
  }, [isChatError, setSnackbarConfig, navigate]);

  const { mutate: mutateRemoveChatData } = useRemoveChatData({
    onSuccess: () => {
      setSnackbarConfig({
        message: "Chat Data Cleared successfully",
        open: true,
        severity: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });

  const handleOnClearChatMessages = () => {
    mutateRemoveChatData({ chatId: chatId });
    setMessages([]);
    setLocalMessages([]);
  };

  return {
    chatData,
    isChatLoading,
    isChatError,
    isChatMessagesLoading,
    messages,
    hasNextPage,
    observerTarget,
    setMessages,
    setLocalMessages,
    isUserTyping,
    handleOnClearChatMessages,
  };
};
