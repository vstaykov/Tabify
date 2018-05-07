"use strict";

import React from "react";
import ReactDOM from "react-dom";
import ShortcutsSection from "./shortcuts-section.js"

const Popup = (props) => {
    let shortcuts = [
        {
            title: "Mute/Unmute tabs",
            keys: ["Ctrl", "Q"]
        },
        {
            title: "Global mute/unmute tabs",
            keys: ["Ctrl", "Shift", "1"]
        },
    ];

    return (
        <ShortcutsSection shortcuts={shortcuts} />
    );
}

export default Popup;