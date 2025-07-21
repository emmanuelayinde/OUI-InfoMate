
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MessageCircle, Send, Plus, GraduationCap, User, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { formatMarkdown } from "@/utils/markdown";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

const Dashboard = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@student.oui.edu"
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastMessage: new Date()
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    let chatToUpdate = currentChat;
    
    // If no current chat, create one
    if (!chatToUpdate) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: inputMessage.length > 30 ? inputMessage.substring(0, 30) + "..." : inputMessage,
        messages: [],
        lastMessage: new Date()
      };
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      chatToUpdate = newChat;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    // Add user message
    setChats(prev => prev.map(chat => 
      chat.id === chatToUpdate!.id 
        ? { ...chat, messages: [...chat.messages, userMessage], lastMessage: new Date() }
        : chat
    ));

    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputMessage}". Here's what I can help you with:

**Academic Information:**
- Course requirements and prerequisites
- Academic calendar and important dates
- Grading policies and procedures

**Student Services:**
- Campus resources and facilities
- Financial aid and scholarships
- Student support services

**Campus Life:**
- Student organizations and activities
- Housing and dining information
- Campus events and announcements

How can I assist you further with your OUI-related questions?`,
        sender: "assistant",
        timestamp: new Date()
      };

      setChats(prev => prev.map(chat => 
        chat.id === chatToUpdate!.id 
          ? { ...chat, messages: [...chat.messages, aiMessage], lastMessage: new Date() }
          : chat
      ));
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="w-64 border-r border-sidebar-border bg-sidebar">
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold text-sidebar-foreground">OUI InfoMate</span>
            </div>
            <Button 
              onClick={createNewChat} 
              className="w-full text-sm" 
              variant="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </SidebarHeader>
          
          <SidebarContent className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {chats.map((chat) => (
                  <Card 
                    key={chat.id} 
                    className={`cursor-pointer transition-colors hover:bg-sidebar-accent ${
                      currentChatId === chat.id ? 'bg-sidebar-accent' : ''
                    }`}
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-sidebar-foreground" />
                        <span className="text-sm font-medium text-sidebar-foreground truncate">
                          {chat.title}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </SidebarContent>

          {/* User Info Section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3 text-sidebar-foreground/60" />
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-border bg-background">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                {currentChat?.title || "OUI InfoMate"}
              </h1>
            </div>
            <ThemeToggle />
          </header>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {currentChat ? (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {currentChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-chat-user text-chat-user-foreground'
                              : 'bg-chat-assistant text-chat-assistant-foreground border border-border'
                          }`}
                        >
                          <div 
                            className="text-sm leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatMarkdown(message.text) }}
                          />
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-chat-assistant text-chat-assistant-foreground border border-border p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-background">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about OUI..."
                        className="flex-1 text-sm sm:text-base"
                        disabled={isLoading}
                      />
                      <Button 
                        onClick={sendMessage} 
                        disabled={!inputMessage.trim() || isLoading}
                        variant="default"
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Welcome Screen
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                  <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-accent mx-auto mb-4" />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Welcome to OUI InfoMate
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    Your AI-powered assistant for all things OUI. Ask me about courses, policies, campus life, and more!
                  </p>
                  <Button onClick={createNewChat} variant="default" className="text-sm sm:text-base">
                    <Plus className="h-4 w-4 mr-2" />
                    Start Your First Chat
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
