'use strict';

class TabsManager {

    muteTabs() {
        let query = { muted: false };

        this.getTabs(query).then(function (tabs) { 
            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, { muted: true });
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