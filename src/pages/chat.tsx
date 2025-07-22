import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GraduationCap, Lightbulb, Menu, Send, Settings } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getAIResponseApi, getChatMessagesApi } from "@/api";
import { ChatSidebar, Loader } from "@/components";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore, useChatStore } from "@/store";
import { CreateChatRequest } from "@/types";
import { formatMarkdown } from "@/utils/markdown";

// Pre-defined questions for OUI students
const preQuestions = [
  "What are the undergraduate admission requirements at Oduduwa University?",
  "Can you provide the academic calendar for the current session?",
  "What courses and faculties are available at OUI?",
  "How much is the tuition for Computer Engineering or Mechanical Engineering?",
  "What is the hostel allocation procedure and hostel fees?",
  "How do I contact the admissions office at OUI?",
  "What is the vision and mission of Oduduwa University?",
  "What are the requirements for Direct Entry admission?",
  "How do I pay school fees and what is the breakdown for Natural and Applied Sciences?",
  "What is the official email address and phone number for OUI?",
  "What are the objectives and philosophy of Oduduwa University?",
  "Is there an exemption fee for students not staying in the school hostel?",
];

// Helper function to format date for grouping

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { userType } = useAuthStore();
  const {
    activeChatId,
    getActiveChat,
    isSidebarOpen,
    toggleChatSidebar,
    activeChatFromHistory,
    updateChat,
  } = useChatStore();

  // Get 3 random pre-questions on component mount
  useEffect(() => {
    const shuffled = [...preQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 3));
  }, []); // Empty dependency array ensures this runs only once

  const currentChat = getActiveChat();

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (currentChat?.messages && currentChat.messages.length > 0) {
      scrollToBottom();
    }
  }, [currentChat?.messages]);

  // Auto-scroll when a new chat is selected
  useEffect(() => {
    if (activeChatId && currentChat) {
      scrollToBottom();
    }
  }, [activeChatId]);

  // =============== API CALLS ===============
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["sendMessage", activeChatId],
    mutationFn: async (request: CreateChatRequest) =>
      await getAIResponseApi(
        request.user_question,
        request.chat_id ? request.chat_id.toString() : null
      ),
    onSuccess: (data) => {
      // invalid queries to refetch chat history
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });

      updateChat(data?.chat_id.toString(), data);
      setMessage("");
    },
    onError: (error) => {
      const errorMessage =
        (typeof error === "object" &&
          error !== null &&
          "response" in error &&
          (error as any).response?.data?.detail) ||
        "Failed to send message. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // Get Chat By ID
  const { data: chatData } = useQuery({
    queryKey: ["chatById", activeChatId],
    queryFn: async () => await getChatMessagesApi(activeChatId),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!activeChatId,
  });

  // Memoize the updateChat function to prevent unnecessary re-renders
  const handleUpdateChat = useCallback(
    (chatId: string, chatData: any) => {
      updateChat(chatId, chatData);
    },
    [updateChat]
  );

  useEffect(() => {
    if (chatData && activeChatId) {
      handleUpdateChat(String(activeChatId), chatData);
    }
  }, [chatData, activeChatId, handleUpdateChat]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: CreateChatRequest = {
      chat_id: activeChatId ?? null,
      user_question: message.trim(),
    };

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    await mutateAsync(newMessage);
  };

  const handlePreQuestion = async (question: string) => {
    setMessage(question);

    const newMessage: CreateChatRequest = {
      chat_id: activeChatId ?? null,
      user_question: question.trim(),
    };

    await mutateAsync(newMessage);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 border-r bg-muted/30 flex-col">
        <ChatSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleChatSidebar}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-background border-r shadow-lg">
            <div className="h-full flex flex-col">
              <ChatSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeChatId ? (
          currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChatSidebar}
                    className="md:hidden"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      {activeChatFromHistory(activeChatId?.toString())?.title ||
                        "Chat"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      AI Assistant for OUI Students
                    </p>
                  </div>
                  <div className="hidden md:flex items-center space-x-2">
                    {userType === "admin" && (
                      <Link to="/admin">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6 max-w-4xl mx-auto">
                  {!currentChat?.messages ||
                  currentChat.messages.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                      <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Welcome to OUI Assistant
                      </h3>
                      <p className="text-muted-foreground mb-6 px-4">
                        Your AI assistant for Oduduwa University Ipetumodu. Get
                        instant information about university services,
                        procedures, and campus life.
                      </p>

                      {/* Pre-defined Questions */}
                      <div className="max-w-2xl mx-auto space-y-3 px-4">
                        <p className="text-sm font-medium text-muted-foreground mb-4">
                          Try asking:
                        </p>
                        <div className="grid gap-3">
                          {selectedQuestions.map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="text-left h-auto p-4 justify-start whitespace-normal"
                              onClick={() => handlePreQuestion(question)}
                            >
                              <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{question}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    currentChat.messages
                      ?.filter((msg) => msg.role !== "system")
                      .sort((a, b) => a.id - b.id)
                      .map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 md:p-4 ${
                              msg.role === "user"
                                ? "bg-chat-user text-chat-user-foreground"
                                : "bg-chat-assistant text-chat-assistant-foreground border"
                            }`}
                          >
                            <div
                              className="whitespace-pre-wrap text-sm md:text-base"
                              dangerouslySetInnerHTML={{
                                __html: formatMarkdown(msg.content),
                              }}
                            />
                            <div className="text-xs opacity-70 mt-2">
                              {new Date(msg.created_at).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )}

                  {/* AI Loading State */}
                  {isPending && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] md:max-w-[80%] rounded-lg p-3 md:p-4 bg-chat-assistant text-chat-assistant-foreground border">
                        <div className="flex items-center space-x-2">
                          <Loader />
                          <span className="text-sm md:text-base">
                            Generating response...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invisible element to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-background">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about OUI..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      variant="default"
                      size="icon"
                      disabled={!message.trim() || isPending}
                    >
                      {isPending ? <Loader /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center border-4 border-red-500">
              <div className="text-center flex flex-col items-center space-y-4">
                <Loader />
                <p className="text-lg text-muted-foreground mt-4">
                  Loading chat...
                </p>
              </div>
            </div>
          )
        ) : (
          <>
            {/* New Chat Header */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChatSidebar}
                  className="md:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold truncate">New Chat</h2>
                  <p className="text-sm text-muted-foreground">
                    AI Assistant for OUI Students
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  {userType === "admin" && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* New Chat Welcome */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="text-center py-8 md:py-12">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Welcome to OUI Assistant
                  </h3>
                  <p className="text-muted-foreground mb-6 px-4">
                    Your AI assistant for Oduduwa University Ipetumodu. Get
                    instant information about university services, procedures,
                    and campus life.
                  </p>

                  {/* Pre-defined Questions */}
                  <div className="max-w-2xl mx-auto space-y-3 px-4">
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      Try asking:
                    </p>
                    <div className="grid gap-3">
                      {selectedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="text-left h-auto p-4 justify-start whitespace-normal"
                          onClick={() => handlePreQuestion(question)}
                        >
                          <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{question}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* New Chat Input Area */}
            <div className="p-4 border-t bg-background">
              <div className="max-w-4xl mx-auto">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about OUI..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    variant="default"
                    size="icon"
                    disabled={!message.trim() || isPending}
                    className="w-fit !px-4"
                  >
                    {isPending ? <Loader /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
