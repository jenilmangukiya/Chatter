import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../../../Auth";
import { useSendMessage } from "../../../../../services";
import { useSocket } from "../../../../../socket/useSocket";
import {
  MESSAGE_TYPING_START,
  MESSAGE_TYPING_STOP,
  NEW_MESSAGE,
} from "../../../../../utils/EVENTS";

export const useSendChatActions = ({
  chatMembers,
  setMessages,
  setLocalMessages,
}: {
  chatMembers: any;
  setMessages: any;
  setLocalMessages: any;
}) => {
  const timeoutRef = useRef<any>(null);
  const { id: chatId } = useParams();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const [isIamTyping, setIsIamTyping] = useState(false);

  const { mutate, isPending } = useSendMessage({
    onSuccess: () => {
      setMessage("");
    },
  });

  const handleSendMessage = () => {
    if (message) {
      const socketMessage = {
        _id: uuidv4(),
        type: "message",
        chat: chatId,
        sender: user.userId,
        content: message,
        createdAt: new Date().toISOString(),
        username: user.fullName,
      };
      setMessages((oldMessages: any) => [socketMessage, ...oldMessages]);
      setLocalMessages((oldMessages: any) => [socketMessage, ...oldMessages]);
      setMessage("");
      socket.emit(NEW_MESSAGE, { chatId, members: chatMembers, message });
    }
  };

  const handleMessageOnchange = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage();
      return;
    }
    if (!isIamTyping) {
      socket.emit(MESSAGE_TYPING_START, { chatId, members: chatMembers });
      setIsIamTyping(true);
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      socket.emit(MESSAGE_TYPING_STOP, { chatId, members: chatMembers });
      setIsIamTyping(false);
    }, 1000);
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
