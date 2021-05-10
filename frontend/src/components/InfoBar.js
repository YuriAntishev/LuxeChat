import React from 'react';
import '../css/infobar.css';

import closeIcon from '../icons/closeIcon.png';
import onlineicon from '../icons/onlineIcon.png';

const InfoBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineicon} alt="online" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/" >
                <img src={closeIcon} alt="close" />
            </a>
        </div>
    </div>
);

export default InfoBar;