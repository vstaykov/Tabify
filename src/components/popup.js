import React from "react";
import ShortcutsSection from "./shortcuts-section";

const Popup = () => {
  const shortcuts = [
    {
      title: "Mute/Unmute tabs",
      keys: ["Ctrl", "Q"]
    },
    {
      title: "Global mute/unmute tabs",
      keys: ["Ctrl", "Shift", "1"]
    }
  ];

  return <ShortcutsSection shortcuts={shortcuts} />;
};

export default Popup;
