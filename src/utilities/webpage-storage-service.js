import uniqid from "uniqid";
import Browser from "./browser";

class WebPageStorageService {
  constructor() {
    this.browser = new Browser();
  }

  getWebPages = async () => {
    const data = await this.browser.getStorageData("tabifyWebPages");
    const webPages = data.tabifyWebPages ? data.tabifyWebPages : [];

    return webPages;
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

  deleteWebPage = id => {
    const deleteWebPagePromise = new Promise(resolve => {
      this.getWebPages().then(webPages => {
        const updatedWebPages = webPages.filter(webPage => webPage.id !== id);

        this.browser.setStorageData(
          { tabifyWebPages: updatedWebPages },
          result => {
            resolve(result);
          }
        );
      });
    });

    return deleteWebPagePromise;
  };
}

export default WebPageStorageService;
