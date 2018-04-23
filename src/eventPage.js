'use strict';

import { TabsManager } from "./TabsManager.js"

let tabsManager = new TabsManager();
let muted = false;

chrome.browserAction.onClicked.addListener(function () {
  if (muted) {
    tabsManager.unmuteTabs();
    muted = false;
  } else {
    tabsManager.muteTabs();
    muted = true;
  }
});
