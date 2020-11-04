import React from "react";
import { Link } from "react-router-dom";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import "./InfoBar.css";

const InfoBar = ({ roomName }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} className="onlineIcon" alt="online" />
                <h3>{roomName}</h3>
            </div>
            <div className="rightInnerContainer">
                <Link to="/">
                    <img src={closeIcon} alt="close icon" />
                </Link>
            </div>
        </div>
    );
};

export default InfoBar;
