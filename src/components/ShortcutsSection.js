"use strict";

import React from "react";
import Shortcut from "./Shortcut.js"

const ShortcutsSection = (props) => {

    return (
        <div className="shortcuts-section">
            <div className="shortcuts-section-title">Shortcuts Cheatsheet</div>
            <hr />
            {props.shortcuts.map((shortcut) => {
                return (
                    <Shortcut key={shortcut.keys} {...shortcut} />
                );
            })}
        </div>
    );
}

export default ShortcutsSection;