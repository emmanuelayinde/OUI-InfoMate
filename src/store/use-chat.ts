import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ChatResponse, IChatState, Message } from "@/types";

export const useChatStore = create<IChatState>()(
  persist(
    (set, get) => ({
      chatHistory: [],
      chats: {},
      activeChatId: null,
      isSidebarOpen: false,

      toggleChatSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },
      openChatSidebar: () => {
        set({ isSidebarOpen: true });
      },
      closeChatSidebar: () => {
        set({ isSidebarOpen: false });
      },

      setChatHistory: (history) => {
        set({ chatHistory: history });
      },

      getActiveChat: () => {
        const state = get();
        return state.activeChatId ? state.chats[state.activeChatId] : null;
      },

      setActiveChat: (chatId: string) => {
        set({ activeChatId: chatId });
      },

      createNewChat: () => {
        set({ activeChatId: null });
      },

      updateChat: (chatId: string, response: ChatResponse) => {

        set((prev) => ({
          activeChatId: chatId,
          chats: {
            ...prev.chats,
            [chatId]: {
              ...prev.chats[chatId],
              messages: response.messages,
            },
          },
        }));
      },

      addMessageToActiveChat: (chatId: string, message: Message) => {
        const state = get();
        const chat = state.chats[chatId];

        if (!chat) {
          return;
        }

        chat.messages.push(message);

        set((prev) => ({
          chats: {
            ...prev.chats,
            [chatId]: chat,
          },
        }));
      },
    }),
    {
      name: "chat-store",
    }
  )
);
