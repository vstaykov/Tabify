import uniqid from "uniqid";
import browser from "./browser";

class WebpageStorageService {
  getWebpages = async () => {
    const data = await browser.getStorageData("tabifyWebpages");
    const webPages = data.tabifyWebpages ? data.tabifyWebpages : [];

    return webPages;
  };

  saveWebpage = async (url, isPinned) => {
    const newPage = {
      id: uniqid(),
      url,
      isPinned
    };

    const webpages = await this.getWebpages();
    webpages.push(newPage);

    await browser.setStorageData({ tabifyWebpages: webpages });
  };

  deleteWebpage = async id => {
    const webpages = await this.getWebpages();
    const updatedWebpages = webpages.filter(webpage => webpage.id !== id);

    await browser.setStorageData({ tabifyWebpages: updatedWebpages });
  };
}

const webpageStorageService = new WebpageStorageService();
export default webpageStorageService;
