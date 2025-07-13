import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  GraduationCap, 
  Plus, 
  Settings,
  LogOut,
  User,
  BookOpen,
  FileText,
  HelpCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
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
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Thesis Research Methods",
      messages: [
        {
          id: "1",
          content: "Can you help me understand different research methodologies for my thesis?",
          sender: "user",
          timestamp: new Date()
        },
        {
          id: "2",
          content: "I'd be happy to help you understand research methodologies! There are several approaches you can consider for your thesis, depending on your field and research questions:\n\n**Quantitative Research:**\n- Surveys and questionnaires\n- Experiments\n- Statistical analysis\n\n**Qualitative Research:**\n- Interviews\n- Focus groups\n- Case studies\n- Ethnographic studies\n\n**Mixed Methods:**\n- Combines both quantitative and qualitative approaches\n\nWhat's your field of study and research topic? This will help me provide more specific guidance.",
          sender: "assistant",
          timestamp: new Date()
        }
      ],
      lastMessage: new Date()
    }
  ]);
  
  const [activeChat, setActiveChat] = useState<string>("1");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentChat = chats.find(chat => chat.id === activeChat);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "I understand your question. Let me help you with that. This is a simulated response - in a real application, this would connect to an AI service to provide personalized academic assistance.",
      sender: "assistant",
      timestamp: new Date()
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage, aiResponse],
              lastMessage: new Date()
            }
          : chat
      )
    );

    setMessage("");
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      lastMessage: new Date()
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const handleLogout = () => {
    toast({
      title: "Goodbye!",
      description: "You've been signed out successfully.",
    });
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="font-semibold">StudyMate AI</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            onClick={createNewChat}
            className="w-full" 
            variant="accent"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {chats.map((chat) => (
              <Card 
                key={chat.id}
                className={`cursor-pointer transition-colors hover:bg-accent/10 ${
                  activeChat === chat.id ? 'bg-accent/20 border-accent' : ''
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{chat.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {chat.messages.length} messages
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="ghost" size="sm" className="justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Research
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Writing
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              Q&A
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-background">
              <h2 className="text-lg font-semibold">{currentChat.title}</h2>
              <p className="text-sm text-muted-foreground">
                AI Assistant for Final Year Students
              </p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6 max-w-4xl mx-auto">
                {currentChat.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                    <p className="text-muted-foreground">
                      Ask me anything about your studies, research, or thesis work.
                    </p>
                  </div>
                ) : (
                  currentChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.sender === 'user'
                            ? 'bg-chat-user text-chat-user-foreground'
                            : 'bg-chat-assistant text-chat-assistant-foreground border'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        <div className="text-xs opacity-70 mt-2">
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
              <div className="max-w-4xl mx-auto">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your studies..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    variant="chat"
                    size="icon"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Select a chat to start</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;