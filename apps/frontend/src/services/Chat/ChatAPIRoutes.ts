export const GET_CHAT_LIST = "/chats";

export const GET_CHAT = (chatId?: string) => `/chats/${chatId || undefined}`;

export const SEND_MESSAGE = `/messages`;

export const GET_CHAT_MESSAGES = "/messages";
