import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "./FileUpload";

interface Message {
  role: "user" | "assistant";
  content: string;
  documentName?: string;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      setDocumentContent(content);
    };
    reader.readAsText(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setDocumentContent("");
  };

  const streamChat = async (userMessage: Message) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-chat`;
    
    try {
      const payload: any = { 
        messages: [...messages, userMessage]
      };
      
      if (documentContent) {
        payload.documentContext = {
          name: selectedFile?.name,
          content: documentContent
        };
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        if (resp.status === 402) {
          toast({
            title: "Credits Required",
            description: "Please add credits to your workspace.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to start stream");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      role: "user", 
      content: input.trim(),
      documentName: selectedFile?.name
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Clear file after sending
    setSelectedFile(null);
    setDocumentContent("");

    await streamChat(userMessage);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">LexAI Assistant</h2>
            <p className="text-sm text-muted-foreground">Legal & Compliance Guidance</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {messages.length === 0 && (
            <div className="flex h-[60vh] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">How can I assist you today?</h3>
              <p className="max-w-md text-muted-foreground">
                Ask me about legal concepts, compliance requirements, document analysis, or general legal guidance.
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.documentName && (
                    <div className="mb-2 flex items-center gap-2 text-xs opacity-80">
                      <FileText className="h-3 w-3" />
                      <span>{msg.documentName}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-card shadow-soft">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <FileUpload
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              selectedFile={selectedFile}
              disabled={isLoading}
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a legal question or upload a document..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            This AI provides general information only. Consult a licensed attorney for specific legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
