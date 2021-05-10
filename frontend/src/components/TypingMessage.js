import React from "react";
import TypingAnimation from "./TypingAnimation";

import "../css/TypingMessage.css";

const TypingMessage = ({ user }) => {
  return (
    <div className="message-item">
      <TypingAnimation
        name={user.name}
      />
    </div>
  );
};

export default TypingMessage;
