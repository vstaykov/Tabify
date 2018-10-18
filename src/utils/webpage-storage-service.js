import uniqid from "uniqid";
import browser from "./browser";

class WebPageStorageService {
  getWebPages = async () => {
    const data = await browser.getStorageData("tabifyWebPages");
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

    await browser.setStorageData({ tabifyWebPages: webPages });
  };

  deleteWebPage = async id => {
    const webPages = await this.getWebPages();
    const updatedWebPages = webPages.filter(webPage => webPage.id !== id);

    await browser.setStorageData({ tabifyWebPages: updatedWebPages });
  };
}

const webPageStorageService = new WebPageStorageService();
export default webPageStorageService;
