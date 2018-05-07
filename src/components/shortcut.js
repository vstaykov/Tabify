"use strict";

import React from "react";

const Shortcut = (props) => {

    return (
        <div>
            <div className="shortcut-title d-inline">{props.title}:</div>
            {props.keys.map((key, i) => {
                let keyElement = <span key={i} className="shortcut-key text-monospace" >{key}</span>;
                let resultElement = (
                    <span>
                        {keyElement}
                        <span className="shortcut-key-concatinator">+</span>
                    </span>
                );

                if (i == props.keys.length - 1) {
                    resultElement = keyElement;
                }

                return resultElement;
            })}
        </div>
    );
};

export default Shortcut;