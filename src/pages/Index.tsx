import { useState } from "react";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatInterface onBack={() => setShowChat(false)} />;
  }

  return <Hero onGetStarted={() => setShowChat(true)} />;
};

export default Index;
