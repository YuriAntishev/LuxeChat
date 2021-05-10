import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatMessage from "./ChatMessage";
import TypingMessage from "./TypingMessage";

const Messages = ({ messages, typingUsers }) => (
    <ScrollToBottom className="messages">
        <div className="messages-container">
            <ol className="messages-list">
                {messages.map((message, i) => (
                    <div key={i}>
                        <ChatMessage message={message}></ChatMessage>
                    </div>
                ))}
                {typingUsers.map((user, i) => (
                    <div key={messages.length + i}>
                        <TypingMessage user={user}></TypingMessage>
                    </div>
                ))}
            </ol>
        </div>
    </ScrollToBottom>
);

export default Messages;