import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../components";
import { getChatMessages, useGetChat } from "../../../services";
import { useSocket } from "../../../socket/useSocket";
import { NEW_MESSAGE } from "../../../utils/EVENTS";

export const useChat = () => {
  const navigate = useNavigate();
  const observerTarget = useRef(null);
  const socket = useSocket();

  const { setSnackbarConfig } = useSnackbar();

  const { id: chatId } = useParams();
  const [messages, setMessages] = useState<any>([]);
  const [localMessages, setLocalMessages] = useState<any>([]);

  const handelNewMessage = useCallback((data: any) => {
    setMessages((oldMessages: any) => [data.message, ...oldMessages]);
    setLocalMessages((oldMessages: any) => [data.message, ...oldMessages]);
  }, []);

  useEffect(() => {
    socket.on(NEW_MESSAGE, handelNewMessage);
    return () => {
      socket.off("new-chat-message", handelNewMessage);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: any) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget.current]);

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
      gcTime: 0,
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
      console.log("data", data);
      return data;
    },
  });

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
  };
};
