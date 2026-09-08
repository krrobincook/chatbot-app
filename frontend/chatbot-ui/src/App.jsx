import { useState } from "react";
import ChatContainer from "./components/ChatContainer";
import InputBar from "./components/InputBar";

const THREAD_ID = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! Welcome to the chat.\nAsk me anything and I’ll be happy to help.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    // add user message
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/chat";
      const res = await fetch(
        apiUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          threadId: THREAD_ID,
          message: userText,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="app">
      <ChatContainer messages={messages} isTyping={isTyping} />
      <InputBar
        value={input}
        setValue={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
