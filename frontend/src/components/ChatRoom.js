import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import useTyping from "./hooks/useTyping";
import NewMessageForm from "./NewMessageForm";
import InfoBar from "./InfoBar";
import Indicator from "./Indicator";
import Messages from "./Messages";

import "../css/input.css";
import '../css/messages.css';
import '../css/message.css';

const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const socketRef = useRef();

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const { room, name } = props.match.params;

  const url = "http://localhost:8000/"

  useEffect(() => {

    socketRef.current = io(url, {
      query: { room, name }
    });

    setUser({
      name: name
    });

    socketRef.current.on('allUsersData', ({ users }) => {
      setUsers(users)
      console.log(users)
    })

    socketRef.current.on("send message", (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on("start typing message", (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => [...users, user]);
      }
    });

    socketRef.current.on("stop typing message", (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => users.filter((u) => u.name !== user.name));
      }
    });

  }, [room, name]);

  const sendMessage = () => {
    if (!socketRef.current) return;
    if (file) {
      const messageObject = {
        senderId: socketRef.current.id,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name,
        user: user
      };
      setNewMessage("");
      setFile();
      socketRef.current.emit("send message", messageObject);
    } else {
      const messageObject = {
        senderId: socketRef.current.id,
        type: "text",
        body: newMessage,
        user: user
      };
      setNewMessage("");
      socketRef.current.emit("send message", messageObject);
    }
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("start typing message", {
      senderId: socketRef.current.id,
      user,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("stop typing message", {
      senderId: socketRef.current.id,
      user,
    });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  function selectFile(e) {
    if (typeof e.target.files[0] !== 'undefined') {
      setNewMessage(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      return null
    }
  }

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages
          messages={messages}
          typingUsers={typingUsers}
        />
        <NewMessageForm
          selectFile={selectFile}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleStartTyping={startTyping}
          handleStopTyping={stopTyping}
          handleSendMessage={handleSendMessage}
        ></NewMessageForm>
      </div>
      <Indicator
        users={users}
      />
    </div>
  );
};

export default ChatRoom;