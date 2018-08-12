import WebPage from "./../models/webpage";

class WebPageStorageService {
  static getWebPages = () => {
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

  static saveWebPage = (url, pinned) => {
    const newPage = new WebPage(url, pinned);

    const setDataPromise = new Promise(resolve => {
      WebPageStorageService.getWebPages().then(webPages => {
        webPages.push(newPage);
        chrome.storage.sync.set({ tabifyWebPages: webPages }, result => {
          resolve(result);
        });
      });
    });

    return setDataPromise;
  };

  static deleteWebPage = webPage => {
    const deleteWebPagePromise = new Promise(resolve => {
      WebPageStorageService.getWebPages().then(webPages => {
        const webPageIndex = webPages.findIndex(
          wp =>
            wp.pageUrl === webPage.pageUrl && wp.isPinned === webPage.isPinned
        );

        if (webPageIndex > -1) {
          webPages.splice(webPageIndex, 1);
          chrome.storage.sync.set({ tabifyWebPages: webPages }, result => {
            resolve(result);
          });
        }
      });
    });

    return deleteWebPagePromise;
  };
}

export default WebPageStorageService;
