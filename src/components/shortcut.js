import React from "react";
import PropTypes from "prop-types";

const Shortcut = props => (
  <div key={props.title}>
    <div className="shortcut-title d-inline">{props.title}:</div>
    {props.keys.map((key, i) => {
      const keyElement = (
        <span className="shortcut-key text-monospace">{key}</span>
      );
      let resultElement = (
        <span key={key}>
          {keyElement}
          <span className="shortcut-key-concatinator">+</span>
        </span>
      );

      if (i === props.keys.length - 1) {
        resultElement = keyElement;
      }

      return resultElement;
    })}
  </div>
);

Shortcut.propTypes = {
  title: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Shortcut;
