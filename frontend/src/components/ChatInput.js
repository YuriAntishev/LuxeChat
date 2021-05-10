import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import '../css/chat.css';
import sendIcon from '../icons/sendIcon.png';
import attachIcon from '../icons/attachIcon.png';
import emojiIcon from '../icons/emojiIcon.png';

const ChatInput = () => {

    return (
        <>
            <form
                className="form">
                <textarea
                    className="textarea"
                    type="text"
                    placeholder="Say something..."
                />
                <label htmlFor="file-input">
                    <div className="uploadButton">
                        <img
                            className="uploadImage"
                            src={attachIcon}
                            alt="uploadImage" />
                    </div>
                </label>
                <input
                    id="file-input"
                    className="input"
                    type="file"
                />
                <button
                    className="sendButton"
                    type='button'
                >
                    <img
                        className="uploadImage"
                        src={emojiIcon}
                        alt="uploadImage" />
                </button>
                <button
                    className="sendButton">
                    <img
                        className="uploadImage"
                        src={sendIcon}
                        alt="uploadImage" />
                </button>
            </form>
            <div>
                {/* showEmoji */}
            </div>
        </>
    )
}

export default ChatInput;