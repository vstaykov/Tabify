import Tabify from "./../tabify";
import Browser from "./browser";

class TabsService {
  constructor() {
    this.browser = new Browser();
  }

  createTab = (url, pinned) => {
    this.browser.createTab(url, pinned);
  };

  muteTabs = async () => {
    const tabs = await this.browser.getTabs({ muted: false });

    tabs.forEach(tab => {
      this.browser.updateTab(tab.id, { muted: true });
    });
  };

  unmuteTabs = async () => {
    const tabs = await this.browser.getTabs({ muted: true });

    tabs.forEach(tab => {
      const { mutedInfo } = tab;

      if (
        mutedInfo.reason === "extension" &&
        mutedInfo.extensionId === Tabify.ID
      ) {
        this.browser.updateTab(tab.id, { muted: false });
      }
    });
  };
}

export default TabsService;
