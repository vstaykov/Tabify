import WebPage from "./../models/webpage";

class WebPageStorageService {
  static getWebPages() {
    const getWebPagesPromise = new Promise(resolve => {
      chrome.storage.sync.get("tabifyWebPages", result => {
        resolve(result.tabifyWebPages);
      });
    });

    return getWebPagesPromise;
  }

  static saveWebPage(title, url, pinned) {
    const newPage = new WebPage(title, url, pinned);

    const setDataPromise = new Promise(resolve => {
      WebPageStorageService.getWebPages().then(webPages => {
        webPages.push(newPage);
        chrome.storage.sync.set({ tabifyWebPages: webPages }, result => {
          resolve(result);
        });
      });
    });

    return setDataPromise;
  }
}

export default WebPageStorageService;
