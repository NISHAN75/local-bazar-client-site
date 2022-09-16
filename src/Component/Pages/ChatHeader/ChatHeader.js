import React from 'react';
import io from "socket.io-client";
import { useState } from "react";
import Chat from '../Chat/Chat';
import './ChatHeader.css'

// https://local-bazar-chat-server.onrender.com

const socket = io.connect(process.env.PORT);

const ChatHeader = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className='flex items-center justify-center my-20'>
        {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter Your name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default ChatHeader