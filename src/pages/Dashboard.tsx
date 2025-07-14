
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
  LogOut,
  User,
  Lightbulb
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { formatMarkdown } from "@/utils/markdown";

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

// Pre-defined questions for OUI students
const preQuestions = [
  "What are the admission requirements for OUI?",
  "How can I check my academic result online?",
  "What is the current school calendar for this session?",
  "How do I register for courses online?",
  "What are the available scholarship opportunities?",
  "How can I contact my academic advisor?",
  "What is the process for hostel accommodation?",
  "How do I pay my school fees online?",
  "What are the graduation requirements for my program?",
  "How can I access the digital library resources?",
  "What support services are available for students?",
  "How do I apply for industrial training placement?"
];

// Helper function to group chats by date
const groupChatsByDate = (chats: Chat[]) => {
  const groups: { [key: string]: Chat[] } = {};
  
  chats.forEach(chat => {
    const dateKey = chat.lastMessage.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(chat);
  });
  
  return groups;
};

// Helper function to format date for grouping
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
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

const Dashboard = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "OUI Admission Requirements",
      messages: [
        {
          id: "1",
          content: "What are the admission requirements for OUI?",
          sender: "user",
          timestamp: new Date()
        },
        {
          id: "2",
          content: "Here are the admission requirements for Oduduwa University Ipetumodu (OUI):\n\n**UTME Requirements:**\n- Minimum of 5 O'Level credits including English and Mathematics\n- JAMB UTME score (varies by course)\n- Post-UTME screening\n\n**Direct Entry:**\n- National Diploma (ND) with Upper Credit\n- NCE with minimum of Merit\n- A-Level with 2 passes\n\n**International Students:**\n- WAEC/NECO equivalent\n- TOEFL/IELTS for non-English speaking countries\n\nWould you like specific information about requirements for your intended course?",
          sender: "assistant",
          timestamp: new Date()
        }
      ],
      lastMessage: new Date()
    },
    {
      id: "2", 
      title: "School Fee Payment",
      messages: [],
      lastMessage: new Date(Date.now() - 86400000) // Yesterday
    }
  ]);
  
  const [activeChat, setActiveChat] = useState<string>("1");
  const [message, setMessage] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get 3 random pre-questions on component mount
  useState(() => {
    const shuffled = [...preQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 3));
  });

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

  const handlePreQuestion = (question: string) => {
    setMessage(question);
    handleSendMessage();
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
              <span className="font-semibold">OUI InfoMate</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
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
          <div className="space-y-4">
            {Object.entries(groupChatsByDate(chats)).map(([dateKey, dateChats]) => (
              <div key={dateKey}>
                <h4 className="text-xs font-medium text-muted-foreground mb-2 px-1">
                  {formatDateGroup(dateKey)}
                </h4>
                <div className="space-y-2">
                  {dateChats.map((chat) => (
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
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john.doe@student.oui.edu.ng</p>
            </div>
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
                AI Assistant for OUI Students
              </p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6 max-w-4xl mx-auto">
                {currentChat.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Welcome to OUI InfoMate</h3>
                    <p className="text-muted-foreground mb-6">
                      Your AI assistant for Oduduwa University Ipetumodu. Get instant information about university services, procedures, and campus life.
                    </p>
                    
                    {/* Pre-defined Questions */}
                    <div className="max-w-2xl mx-auto space-y-3">
                      <p className="text-sm font-medium text-muted-foreground mb-4">Try asking:</p>
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
                        <div 
                          className="whitespace-pre-wrap" 
                          dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                        />
                        <div className="text-xs opacity-70 mt-2">
                          {msg.timestamp.toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
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
                    placeholder="Ask me anything about OUI..."
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
