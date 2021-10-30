import React from "react";

export default function Footer({ message, setMessage, onSubmit }) {
  return (
    <div className="chat-footer">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
      </form>
    </div>
  );
}
