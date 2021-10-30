import React from "react";
export default function Join({
  name,
  setName,
  roomId,
  setRoomId,
  history,
  socket,
  setConnected,
  connected,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("socketId", socket.id);
    setConnected(true);
    history.push("/room/" + roomId + "?name=" + name);
    setName("");
    setRoomId("");
  };
  return (
    <div className="join-wrapper">
      <h1>Join a Room</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label>Room ID</label>
          <input
            type="text"
            placeholder="d1E83ls032lq"
            defaultValue={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
        <button>Join</button>
      </form>
      <p>
        Rooms are not private, only share the room id with who you want to chat
        privately with.
      </p>
    </div>
  );
}
