'use strict';

import { TabsManager } from "./TabsManager.js"

let tabsManager = new TabsManager();
let muted = false;

chrome.commands.onCommand.addListener(function (command) {
  switch (command){
    case "toggle-quite-mode":
      toggleQuiteMode();
      break;
      default:
      console.log(`Command ${command} detected but not handled.`)
      break;
  }
});

function toggleQuiteMode() {
  if (muted) {
    tabsManager.unmuteTabs();
    muted = false;
  } else {
    tabsManager.muteTabs();
    muted = true;
  }
}
