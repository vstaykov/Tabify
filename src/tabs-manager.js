import Tabify from './tabify';

class TabsManager {
  muteTabs() {
    const query = { muted: false };

    this.getTabs(query).then((tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.update(tab.id, { muted: true });
      });
    });
  }

  unmuteTabs() {
    /* eslint-disable prefer-destructuring */
    const query = { muted: true };

    this.getTabs(query).then((tabs) => {
      tabs.forEach((tab) => {
        const mutedInfo = tab.mutedInfo;

        if (mutedInfo.reason === 'extension' && mutedInfo.extensionId === Tabify.ID) {
          chrome.tabs.update(tab.id, { muted: false });
        }
      });
    });
  }
  /* eslint-enable prefer-destructuring */

  /* eslint-disable class-methods-use-this */
  getTabs(query) {
  /* eslint-enable class-methods-use-this */
    const gatTabsPromise = new Promise(((resolve) => {
      chrome.tabs.query(query, (tabs) => {
        resolve(tabs);
      });
    }));

    return gatTabsPromise;
  }
}

export default TabsManager;
