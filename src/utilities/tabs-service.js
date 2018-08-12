import Tabify from "./../tabify";

class TabsService {
  createTab = (url, pinned) => {
    chrome.tabs.create({
      url,
      pinned
    });
  };

  muteTabs = () => {
    const query = { muted: false };

    this.getTabs(query).then(tabs => {
      tabs.forEach(tab => {
        chrome.tabs.update(tab.id, { muted: true });
      });
    });
  };

  unmuteTabs = () => {
    const query = { muted: true };

    this.getTabs(query).then(tabs => {
      tabs.forEach(tab => {
        const { mutedInfo } = tab;

        if (
          mutedInfo.reason === "extension" &&
          mutedInfo.extensionId === Tabify.ID
        ) {
          chrome.tabs.update(tab.id, { muted: false });
        }
      });
    });
  };

  /* eslint-disable class-methods-use-this */
  getTabs = query => {
    /* eslint-enable class-methods-use-this */
    const gatTabsPromise = new Promise(resolve => {
      chrome.tabs.query(query, tabs => {
        resolve(tabs);
      });
    });

    return gatTabsPromise;
  };
}

export default TabsService;
