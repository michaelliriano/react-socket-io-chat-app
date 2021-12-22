import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/ChatRoom/Sidebar';
import Footer from '../components/ChatRoom/Footer';
import Messages from '../components/ChatRoom/Messages';
import Modal from '../components/common/Modal';
import moment from 'moment';

export default function ChatRoom({ socket, match }) {
  const ROOM_ID = match.params.id;
  const urlUserName = new URLSearchParams(window.location.search);
  const USER_NAME = Object.fromEntries(urlUserName.entries()).name;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPrivateChatModal, setShowPrivateChatModal] = useState(false);
  const [incomingPrivateRequest, setIncomingPrivateRequest] = useState(null);
  const senderId = socket.id;
  const messageBox = useRef(null);
  const handleClickUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const requestPrivateChat = () => {
    socket.emit('request private chat', {
      socketId: selectedUser.id,
      user: socket.id,
      name: selectedUser.name,
    });
    console.log('message sent');
    setShowModal(false);
  };
  const joinPrivateChat = () => {
    socket.emit('join private chat', {
      user: incomingPrivateRequest.user,
      name: incomingPrivateRequest.name,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const time = moment().format('LT');
    socket.emit('send message', { message, time });
    setMessage('');
  };
  useEffect(() => {
    socket.emit('join', { name: USER_NAME, roomId: ROOM_ID });
    return () => {};
  }, [USER_NAME, ROOM_ID, socket]);
  useEffect(() => {
    socket.on('disconnect', () => {});
    return () => {
      localStorage.removeItem('socketId');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('accept message', (data) => {
      setMessages(data.messages);
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    });
    socket.on('private chat accepted', (data) => {
      window.location.href = `/room/${data.user}?name=${USER_NAME}`;
    });
    socket.on('receive private chat message', (data) => {
      setIncomingPrivateRequest(data);
      setShowPrivateChatModal(true);
    });
    socket.on('new user', (data) => {
      setUsers(data.all);
      setRoomName(data.name);
    });
    socket.on('left', (data) => {
      setUsers(data);
    });
  }, [messages, socket]);

  return (
    <div className="chat-wrapper">
      {showModal && (
        <Modal
          header="Private Chat"
          open={() => setShowModal(true)}
          close={() => setShowModal(false)}
          submit={requestPrivateChat}
        >
          <p>{'Would you like to private chat ' + selectedUser.name + '?'}</p>
        </Modal>
      )}
      {showPrivateChatModal && (
        <Modal
          header="Private Chat"
          open={() => setShowPrivateChatModal(true)}
          close={() => setShowPrivateChatModal(false)}
          submit={() => joinPrivateChat()}
        >
          <p>
            {incomingPrivateRequest.name + ' would you like to private chat ?'}
          </p>
        </Modal>
      )}
      <Sidebar
        users={users}
        userLength={users.length}
        roomName={roomName}
        handleClick={handleClickUser}
      />
      <Messages
        messages={messages}
        refElement={messageBox}
        senderId={senderId}
      />
      <Footer message={message} setMessage={setMessage} onSubmit={onSubmit} />
    </div>
  );
}
