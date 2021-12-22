import React from "react";

export default function Sidebar({ userLength, users, roomName, handleClick }) {
  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar--title">
        <h3>{roomName}</h3>
      </div>
      <div className="chat-sidebar--info">
        <h3>PARTY SIZE: {userLength}</h3>
      </div>
      <div className="chat-sidebar--users">
        <h3>USERS ONLINE</h3>
        <ul>
          {!!users &&
            users.map((user) => (
              <li key={user.id} onClick={() => handleClick(user)}>
                @{user.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
