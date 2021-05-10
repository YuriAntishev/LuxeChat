import React from "react";
import "../css/TypingAnimation.css";

const TypingAnimation = ({ name }) => {
  return (
    <div className="dotsContainer">
      <p>{name} is typing</p>
      <span id="dot1"></span>
      <span id="dot2"></span>
      <span id="dot3"></span>
    </div>
  );
};

export default TypingAnimation;
