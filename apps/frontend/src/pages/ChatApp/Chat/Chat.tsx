import { useParams } from "react-router-dom";
import { Chat as ChatModule } from "../../../modules";

export const Chat = () => {
  const { id: chatId } = useParams();
  return <ChatModule key={chatId} />;
};
