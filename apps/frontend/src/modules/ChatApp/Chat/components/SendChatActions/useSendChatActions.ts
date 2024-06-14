import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSendMessage } from "../../../../../services";
import { useSocket } from "../../../../../socket/useSocket";
import { NEW_MESSAGE } from "../../../../../utils/EVENTS";

export const useSendChatActions = ({ chatMembers }: { chatMembers: any }) => {
  const { id: chatId } = useParams();
  const socket = useSocket();
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
      setMessage("");
      socket.emit(NEW_MESSAGE, { chatId, members: chatMembers, message });
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
