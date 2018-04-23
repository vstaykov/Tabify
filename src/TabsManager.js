'use strict';

import { Tabify } from "./Tabify.js"

class TabsManager {

    muteTabs() {
        let query = { muted: false };

        this.getTabs(query).then(function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, { muted: true });
            });
        });
    }

    unmuteTabs() {
        let query = { muted: true };

        this.getTabs(query).then(function (tabs) {
            tabs.forEach(tab => {
                let mutedInfo = tab.mutedInfo;

                if (mutedInfo.reason == "extension" && mutedInfo.extensionId == Tabify.ID) {
                    chrome.tabs.update(tab.id, { muted: false });
                }
            });
        });
    }

    getTabs(query) {
        let gatTabsPromise = new Promise(function (resolve, reject) {
            chrome.tabs.query(query, function (tabs) {
                resolve(tabs);
            });
        });

        return gatTabsPromise;
    }
}

export { TabsManager }