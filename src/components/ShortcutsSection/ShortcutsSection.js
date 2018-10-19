import React from "react";
import PropTypes from "prop-types";
import Shortcut from "../Shortcut/Shortcut";

const ShortcutsSection = ({ shortcuts }) => (
  <div className="shortcuts-section">
    <div className="shortcuts-section-title">Shortcuts Cheatsheet</div>
    <hr />
    {shortcuts.map(shortcut => <Shortcut {...shortcut} key={shortcut.title} />)}
  </div>
);

ShortcutsSection.propTypes = {
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      keys: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};

export default ShortcutsSection;
