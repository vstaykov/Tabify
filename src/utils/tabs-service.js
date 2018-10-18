import Tabify from "./../tabify";
import browser from "./browser";

class TabsService {
  createTab = (url, pinned) => {
    browser.createTab(url, pinned);
  };

  muteTabs = async () => {
    const tabs = await browser.getTabs({ muted: false });

    tabs.forEach(tab => {
      browser.updateTab(tab.id, { muted: true });
    });
  };

  unmuteTabs = async () => {
    const tabs = await browser.getTabs({ muted: true });

    tabs.forEach(tab => {
      const { mutedInfo } = tab;

      if (
        mutedInfo.reason === "extension" &&
        mutedInfo.extensionId === Tabify.ID
      ) {
        browser.updateTab(tab.id, { muted: false });
      }
    });
  };
}

const tabsService = new TabsService();
export default tabsService;
