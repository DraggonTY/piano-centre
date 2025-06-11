
import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatForm } from "./ChatForm";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
      <ChatForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
