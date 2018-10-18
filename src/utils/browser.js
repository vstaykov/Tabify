class Browser {
  constructor() {
    this.chrome = chrome;
  }

  createTab = (url, pinned) => {
    this.chrome.tabs.create({
      url,
      pinned
    });
  };

  updateTab = (tabId, data) => {
    this.chrome.tabs.update(tabId, data);
  };

  getTabs = query => {
    const gatTabsPromise = new Promise(resolve => {
      this.chrome.tabs.query(query, tabs => {
        resolve(tabs);
      });
    });

    return gatTabsPromise;
  };

  getStorageData = key => {
    const getDataPromise = new Promise(resolve => {
      this.chrome.storage.sync.get(key, result => resolve(result));
    });

    return getDataPromise;
  };

  setStorageData = data => {
    const setDataPromise = new Promise(resolve => {
      chrome.storage.sync.set(data, result => resolve(result));
    });

    return setDataPromise;
  };

  addCommandsListener = commandCallback => {
    this.chrome.commands.onCommand.addListener(commandCallback);
  };
}

const browser = new Browser();
export default browser;
