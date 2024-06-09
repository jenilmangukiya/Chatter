import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSendMessage } from "../../../../../services";

export const useSendChatActions = () => {
  const { id: chatId } = useParams();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useSendMessage({
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["ChatMessages", chatId] });
    },
  });

  const handleSendMessage = () => {
    if (message) {
      mutate({
        content: message,
        chatId: chatId,
        type: "message",
      });
    }
  };

  const handleMessageOnchange = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return {
    mutate,
    isPending,
    message,
    setMessage,
    handleSendMessage,
    handleMessageOnchange,
  };
};
