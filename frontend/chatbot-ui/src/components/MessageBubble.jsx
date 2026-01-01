export default function MessageBubble({ role, text, typing }) {
  return (
    <div className={`message-row ${role}`}>
      <div className="message">
        {typing ? (
          <div className="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
