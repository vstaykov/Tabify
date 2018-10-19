import React from "react";
import PropTypes from "prop-types";

const Shortcut = ({ title, keys }) => (
  <div>
    <div className="shortcut-title d-inline">{title}:</div>
    {keys.map((key, i) => {
      const keyElement = (
        <span className="shortcut-key text-monospace">{key}</span>
      );
      let resultElement = (
        <span key={key}>
          {keyElement}
          <span className="shortcut-key-concatinator">+</span>
        </span>
      );

      if (i === keys.length - 1) {
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
