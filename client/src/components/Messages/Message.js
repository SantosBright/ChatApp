import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

const Message = ({ name, message: { user, text } }) => {
    let isSendByCurrentUser = false;
    let trimedName = name.trim().toLowerCase();

    if (user === trimedName) isSendByCurrentUser = true;

    return isSendByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">
                    {ReactEmoji.emojify(text)}
                </p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">
                    {ReactEmoji.emojify(text)}
                </p>
            </div>
            <p className="sendUser pl-10">{user}</p>
        </div>
    );
};

export default Message;
