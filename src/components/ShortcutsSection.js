"use strict";

import React from "react";
import Shortcut from "./Shortcut.js"

const ShortcutsSection = (props) => {

    return (
        <div>
            <div>Shortcuts Cheatsheet</div>
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