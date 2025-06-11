
import { useState, useEffect } from "react";
import { ChatButton } from "./ChatButton";
import { ChatForm } from "./ChatForm";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const handleMobileMenuToggle = (event: CustomEvent) => {
      setShouldHide(event.detail.isOpen);
      if (event.detail.isOpen) {
        setIsOpen(false); // Close chat when mobile menu opens
      }
    };

    window.addEventListener('mobileMenuToggle', handleMobileMenuToggle as EventListener);

    return () => {
      window.removeEventListener('mobileMenuToggle', handleMobileMenuToggle as EventListener);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (shouldHide) {
    return null;
  }

  return (
    <>
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
      <ChatForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
