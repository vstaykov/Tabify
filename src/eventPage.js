'use strict';

import { TabsManager } from "./TabsManager.js"

let tabsManager = new TabsManager();

chrome.browserAction.onClicked.addListener(function () {
  tabsManager.muteTabs();
});
