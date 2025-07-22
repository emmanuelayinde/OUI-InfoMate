export interface ChatHistory {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatsResponse {
  chats: ChatHistory[];
}

export interface Message {
  id: number;
  role: "system" | "user" | "assistant";
  content: string;
  created_at: string;
}

export interface CreateChatRequest {
  chat_id: string | number | null;
  user_question: string;
}

export interface ChatWithMessages extends ChatHistory {
  messages: Message[];
}

export interface ChatResponse {
  response: string;
  chat_id: number;
  messages: Message[] | null;
}

export interface IChatState {
  chatHistory: ChatHistory[];
  activeChatId: string | number | null;
  chats: { [key: string]: ChatWithMessages };
  isSidebarOpen: boolean;

  activeChatFromHistory: (chatId: string) => ChatHistory | null;
  toggleChatSidebar: () => void;
  openChatSidebar: () => void;
  closeChatSidebar: () => void;
  setChatHistory: (history: ChatHistory[]) => void;
  getActiveChat: () => ChatWithMessages | null;
  setActiveChat: (chatId: string | number) => void;
  createNewChat: () => void;
  addMessageToActiveChat: (chatId: string, message: Message) => void;
  updateChat: (
    chatId: string,
    response: ChatResponse | ChatWithMessages
  ) => void;
}
