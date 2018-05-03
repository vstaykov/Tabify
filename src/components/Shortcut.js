"use strict";

import React from "react";

const Shortcut = (props) => {

    return (
        <div className="row">
            <div>{props.title}:</div>
            {props.keys.map((key, i) => {
                let concatString = i == props.keys.length - 1 ? "" : " + ";
                return(
                    <span key={i}>{key}{concatString}</span>
                );
            })}
        </div>
    );
};

export default Shortcut;