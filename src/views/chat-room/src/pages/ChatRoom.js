import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/ChatRoom/Sidebar";
import Footer from "../components/ChatRoom/Footer";
import Messages from "../components/ChatRoom/Messages";
import moment from "moment";

export default function ChatRoom({ socket, match }) {
  const ROOM_ID = match.params.id;
  const urlUserName = new URLSearchParams(window.location.search);
  const USER_NAME = Object.fromEntries(urlUserName.entries()).name;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const senderId = socket.id;
  const messageBox = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const time = moment().format("LT");
    socket.emit("send message", { message, time });
    setMessage("");
  };
  useEffect(() => {
    socket.emit("join", { name: USER_NAME, roomId: ROOM_ID });
    return () => {
      localStorage.removeItem("socketId");
    };
  }, [USER_NAME, ROOM_ID, socket]);
  useEffect(() => {
    socket.on("disconnect", () => {});
    return () => {
      localStorage.removeItem("socketId");
    };
  }, [socket]);
  useEffect(() => {
    socket.on("accept message", (data) => {
      setMessages(data.messages);
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    });
    socket.on("new user", (data) => {
      setUsers(data.all);
      setRoomName(data.name);
    });
    socket.on("left", (data) => {
      setUsers(data);
    });
  }, [messages, socket]);

  return (
    <div className="chat-wrapper">
      <Sidebar users={users} userLength={users.length} roomName={roomName} />
      <Messages
        messages={messages}
        refElement={messageBox}
        senderId={senderId}
      />
      <Footer message={message} setMessage={setMessage} onSubmit={onSubmit} />
    </div>
  );
}
