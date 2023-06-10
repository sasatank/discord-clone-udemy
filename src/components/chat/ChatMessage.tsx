import React from 'react';
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

const ChatMessage = () => {
  return (
    <div className='message'>
      <Avatar />
      <div className="messageInfo">
        <h4>Shin Code
          <span className='messageTimestamp'>2023:6/21</span>
        </h4>
        <p>メッセージ本文</p>
      </div>
    </div>
  );
}

export default ChatMessage;