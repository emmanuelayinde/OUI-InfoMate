import { useQuery } from "@tanstack/react-query";
import {
  GraduationCap,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";
import { useEffect } from "react";

import { getChatsHistoryApi } from "@/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore, useChatStore } from "@/store";
import { ChatHistory } from "@/types";
import { Link, useNavigate } from "react-router-dom";

const formatDateGroup = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }
};

const groupChatsByDate = (chats: ChatHistory[]) => {
  const groups: { [key: string]: ChatHistory[] } = {};

  // Sort chats by updated_at in descending order (latest first)
  const sortedChats = [...chats].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  sortedChats.forEach((chat) => {
    const dateKey = new Date(chat.updated_at).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(chat);
  });

  return groups;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    createNewChat,
    setActiveChat,
    chatHistory,
    activeChatId,
    setChatHistory,
    closeChatSidebar,
    toggleChatSidebar,
  } = useChatStore();
  const { userProfile, logout, userType } = useAuthStore();

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    closeChatSidebar();
  };

  const handleLogout = () => {
    logout();
    closeChatSidebar();
    navigate("/");
  };

  // ================ API CALL ================
  const { data: chats } = useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => await getChatsHistoryApi(),
  });

  useEffect(() => {
    if (chats) {
      setChatHistory(chats.chats);
    }
  }, [chats]);

  return (
    <>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-accent" />
            <span className="font-semibold text-sm">OUI Assistant</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChatSidebar}
              className="md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Button onClick={createNewChat} className="w-full" variant="default">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          {userType === "admin" && (
            <Link to="/admin" className="block">
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {Object.entries(groupChatsByDate(chatHistory))
            .sort(
              ([dateKeyA], [dateKeyB]) =>
                new Date(dateKeyB).getTime() - new Date(dateKeyA).getTime()
            )
            .map(([dateKey, dateChats]) => (
              <div key={dateKey}>
                <h4 className="text-xs font-medium text-muted-foreground mb-2 px-1">
                  {formatDateGroup(dateKey)}
                </h4>
                <div className="space-y-2">
                  {dateChats.map((chat) => (
                    <Card
                      key={chat.id}
                      className={`cursor-pointer transition-colors hover:bg-accent/10 ${
                        activeChatId == chat.id
                          ? "bg-accent/20 border-accent"
                          : ""
                      }`}
                      onClick={() => handleChatSelect(chat?.id?.toString())}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {chat.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(chat.updated_at).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {userProfile?.first_name} {userProfile?.last_name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userProfile?.email || userProfile?.username}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
