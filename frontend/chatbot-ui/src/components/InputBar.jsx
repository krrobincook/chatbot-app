import { useRef, useEffect } from "react";

export default function InputBar({ value, setValue, sendMessage }) {
  const textareaRef = useRef(null);

  // Focus once on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="input-bar">
      <div className="input-wrapper">
        <div className="input-box">
          <textarea
            ref={textareaRef}            
            placeholder="Ask anything"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
