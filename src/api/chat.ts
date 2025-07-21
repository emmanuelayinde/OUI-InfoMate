import { ChatResponse, ChatsResponse, ChatWithMessages } from "@/types";
import { api } from "./axios";

export const getChatsHistoryApi = async (): Promise<ChatsResponse> => {
  const response = await api.get(`/chats`);
  return response.data;
};

export const getChatMessagesApi = async (
  chatId: string
): Promise<ChatWithMessages> => {
  const response = await api.get(`/chats/${chatId}`);
  return response.data;
};

export const getAIResponseApi = async (
  message: string,
  chatId: string | null = null
): Promise<ChatResponse> => {
  const response = await api.post(`/get_ai_response`, {
    chat_id: chatId,
    user_question: message,
    return_with_history: true,
  });
  return response.data;
};
