import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ContactModalContextType = {
  isOpen: boolean;
  initialTopic: string;
  open: (topicOrEvent?: string | React.MouseEvent) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  initialTopic: "",
  open: () => {},
  close: () => {},
});

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTopic, setInitialTopic] = useState("");

  const open = useCallback((topicOrEvent?: string | React.MouseEvent) => {
    const topic = typeof topicOrEvent === "string" ? topicOrEvent : "";
    setInitialTopic(topic);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ isOpen, initialTopic, open, close }}>
      {children}
    </ContactModalContext.Provider>
  );
};
