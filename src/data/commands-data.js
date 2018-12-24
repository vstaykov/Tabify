const commandsData = {
  toggleQuietMode: {
    id: "toggle-quiet-mode",
    description: "Toggle quiet mode on or off",
    global: false,
    defaultKeys: "Ctrl+Q",
    macKeys: "Command+Shift+Q"
  },
  globalToggleQuietMode: {
    id: "global-toggle-quiet-mode",
    description: "Toggle quiet mode on or off pressed outside Chrome context",
    global: true,
    defaultKeys: "Ctrl+Shift+1",
    macKeys: "Command+Shift+1"
  },
  openSavedWebPages: {
    id: "open-saved-web-pages",
    description: "Open all saved web pages",
    global: false,
    defaultKeys: "Ctrl+I",
    macKeys: "Command+I"
  }
};

module.exports = commandsData;
