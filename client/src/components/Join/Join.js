import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <Link
                        to={`/chat?name=${name}&room=${room}`}
                        onClick={(e) => (!name || !room) && e.preventDefault()}
                    >
                        <button type="submit" className="button mt-20">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Join;
