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

    TabsService.getTabs(query).then(tabs => {
      tabs.forEach(tab => {
        chrome.tabs.update(tab.id, { muted: true });
      });
    });
  };

  unmuteTabs = () => {
    const query = { muted: true };

    TabsService.getTabs(query).then(tabs => {
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

  static getTabs = query => {
    const gatTabsPromise = new Promise(resolve => {
      chrome.tabs.query(query, tabs => {
        resolve(tabs);
      });
    });

    return gatTabsPromise;
  };
}

export default TabsService;
