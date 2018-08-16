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

  getStorageData = (key, resolveCallback) => {
    this.chrome.storage.sync.get(key, result => {
      resolveCallback(result);
    });
  };

  setStorageData = (data, resolveCallback) => {
    chrome.storage.sync.set(data, result => {
      resolveCallback(result);
    });
  };

  addCommandsListener = commandCallback => {
    this.chrome.commands.onCommand.addListener(commandCallback);
  };
}

export default Browser;
