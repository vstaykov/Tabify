import WebPage from "./../models/webpage";

class WebPageStorageService {
  static getWebPages() {
    const getWebPagesPromise = new Promise(resolve => {
      chrome.storage.sync.get("tabifyWebPages", result => {
        console.log(result.tabifyWebPages);
        resolve(result.tabifyWebPages);
      });
    });

    return getWebPagesPromise;
  }

  static saveWebPage(title, url, pinned) {
    const newPage = new WebPage(title, url, pinned);
    const setDataPromise = new Promise(resolve => {
      chrome.storage.sync.set({ tabifyWebPages: [newPage] }, result => {
        resolve(result);
      });
    });

    return setDataPromise;
  }
}

export default WebPageStorageService;
