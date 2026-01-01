import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatContainer({ messages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-container">
      <div className="chat-inner">
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} text={msg.text} />
        ))}

        {isTyping && (
          <MessageBubble role="assistant" text="Thinking..." />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
