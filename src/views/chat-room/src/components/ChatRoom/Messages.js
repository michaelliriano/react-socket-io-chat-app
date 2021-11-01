import React from "react";

export default function Messages({ messages, refElement, senderId, handleClick }) {
  return (
    <div ref={refElement} className="chat-messages">
      {messages.map(({ id, msg, name, msgId, time }) => (
        <div
          key={msgId}
          className={
            id === senderId ? "chat-msg__sender" : "chat-msg__receiver"
          }
        >
          <h4>{msg}</h4>
          <p>{name + " " + time}</p>
        </div>
      ))}
    </div>
  );
}
