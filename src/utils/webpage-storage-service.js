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

  saveWebPage = async (url, isPinned) => {
    const newPage = {
      id: uniqid(),
      url,
      isPinned
    };

    const webPages = await this.getWebPages();
    webPages.push(newPage);

    await this.browser.setStorageData({ tabifyWebPages: webPages });
  };

  deleteWebPage = async id => {
    const webPages = await this.getWebPages();
    const updatedWebPages = webPages.filter(webPage => webPage.id !== id);

    await this.browser.setStorageData({ tabifyWebPages: updatedWebPages });
  };
}

export default WebPageStorageService;
