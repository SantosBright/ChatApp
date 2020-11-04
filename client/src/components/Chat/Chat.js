import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

const API_URL = "localhost:5000";
const socket = io(API_URL);

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);
        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (err) => {
            console.log(err);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar roomName={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
