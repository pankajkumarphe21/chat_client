
import './App.css';
import io from 'socket.io-client';
import { useState } from "react"
import Chat from './Chat';

const socket = io.connect("https://chat-three-roan-94.vercel.app/")

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    setShowChat(true);
  }
  return (
    <div className="App">
      {
        !showChat?
        <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input type="text" placeholder="John..." onChange={(e) => { setUserName(e.target.value) }} value={userName} />
        <input type="text" placeholder="Room ID..." onChange={(e) => { setRoom(e.target.value) }} value={room} />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      :
      <div>
      <Chat socket={socket} userName={userName} room={room} />
    </div>
      }
    </div>
  );
}

export default App;
