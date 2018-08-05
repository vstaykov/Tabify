import WebPage from "./../models/webpage";

class WebPageStorageService {
  getWebPages = () => {
    const getWebPagesPromise = new Promise(resolve => {
      chrome.storage.sync.get("tabifyWebPages", result => {
        const webPages =
          result.tabifyWebPages !== null && result.tabifyWebPages !== undefined
            ? result.tabifyWebPages
            : [];
        resolve(webPages);
      });
    });

    return getWebPagesPromise;
  };

  saveWebPage = (url, pinned) => {
    const newPage = new WebPage(url, pinned);

    const setDataPromise = new Promise(resolve => {
      this.getWebPages().then(webPages => {
        webPages.push(newPage);
        chrome.storage.sync.set({ tabifyWebPages: webPages }, result => {
          resolve(result);
        });
      });
    });

    return setDataPromise;
  };
}

export default WebPageStorageService;
