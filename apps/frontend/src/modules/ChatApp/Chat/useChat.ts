import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../components";
import { useGetChat, useGetChatMessages } from "../../../services";
import { useSocket } from "../../../socket/useSocket";
import { NEW_MESSAGE } from "../../../utils/EVENTS";

export const useChat = () => {
  const { id: chatId } = useParams();
  const queryClient = useQueryClient();
  const { setSnackbarConfig } = useSnackbar();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.on(NEW_MESSAGE, (data) => {
      queryClient.invalidateQueries({ queryKey: ["ChatMessages", chatId] });
    });
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

  const { data: chatMessages, isLoading: isChatMessagesLoading } =
    useGetChatMessages({
      chatId: chatId || undefined,
      queryParams: {
        throwOnError: () => {
          return false;
        },
        enabled: !!chatId,
        retry: 1,
      },
    });

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
    chatMessages,
    isChatMessagesLoading,
  };
};
