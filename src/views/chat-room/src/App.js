import React, { useState } from 'react';
import Header from './components/common/Header';
import Join from './pages/Join';
import ChatRoom from './pages/ChatRoom';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './components/common/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const { io } = require('socket.io-client');
const ENDPOINT = process.env.REACT_APP_SOCKET_URL; // SET SOCKET LOCATION HERE http://localhost:{your port here}
const socket = io(ENDPOINT);

function App() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [connected, setConnected] = useState(
    localStorage.getItem('socketId') || false,
  );
  return (
    <Router>
      <>
        <Header
          title="Chat rooms"
          connected={connected}
          setConnected={setConnected}
        />
        <Switch>
          <PrivateRoute component={ChatRoom} socket={socket} path="/room/:id" />
          <Route
            path="/"
            render={(props) => (
              <Join
                {...props}
                name={name}
                setName={setName}
                roomId={roomId}
                setRoomId={setRoomId}
                connected={connected}
                setConnected={setConnected}
                socket={socket}
              />
            )}
            exact
          ></Route>
          <Route path="*" render={(props) => <PageNotFound />}></Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
