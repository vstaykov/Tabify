import uniqid from "uniqid";
import Browser from "./browser";

class WebPageStorageService {
  constructor() {
    this.browser = new Browser();
  }

  getWebPages = () => {
    const getWebPagesPromise = new Promise(resolve => {
      this.browser.getStorageData("tabifyWebPages", result => {
        const webPages =
          result.tabifyWebPages !== null && result.tabifyWebPages !== undefined
            ? result.tabifyWebPages
            : [];
        resolve(webPages);
      });
    });

    return getWebPagesPromise;
  };

  saveWebPage = (url, isPinned) => {
    const newPage = {
      id: uniqid(),
      url,
      isPinned
    };

    const setDataPromise = new Promise(resolve => {
      this.getWebPages().then(webPages => {
        webPages.push(newPage);
        this.browser.setStorageData({ tabifyWebPages: webPages }, result => {
          resolve(result);
        });
      });
    });

    return setDataPromise;
  };

  deleteWebPage = webPage => {
    const deleteWebPagePromise = new Promise(resolve => {
      this.getWebPages().then(webPages => {
        const webPageIndex = webPages.findIndex(
          wp =>
            wp.pageUrl === webPage.pageUrl && wp.isPinned === webPage.isPinned
        );

        if (webPageIndex > -1) {
          webPages.splice(webPageIndex, 1);
          this.browser.setStorageData({ tabifyWebPages: webPages }, result => {
            resolve(result);
          });
        }
      });
    });

    return deleteWebPagePromise;
  };
}

export default WebPageStorageService;
