export const GET_CHAT_LIST_API = "/chats";

export const GET_CHAT_API = (chatId?: string) =>
  `/chats/${chatId || undefined}`;

export const SEND_MESSAGE_API = `/messages`;

export const GET_CHAT_MESSAGES_API = "/messages";
