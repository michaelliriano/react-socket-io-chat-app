import React from "react";
import { Link } from "react-router-dom";

export default function Header({ title, connected, setConnected }) {
  const handleLeave = () => {
    localStorage.removeItem("socketId");
    setConnected(false);
    window.location.reload()
  };
  return (
    <nav>
      <div>
        <h1>{title}</h1>
      </div>
      <ul>
        <li onClick={handleLeave}>
          <Link to="/">Home</Link>
        </li>
        {!!connected && (
          <li onClick={handleLeave}>
            <Link to="/">Leave</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
