import Tabify from "./../tabify";
import Browser from "./browser";

class TabsService {
  constructor() {
    this.browser = new Browser();
  }

  createTab = (url, pinned) => {
    this.browser.createTab(url, pinned);
  };

  muteTabs = () => {
    const query = { muted: false };

    this.browser.getTabs(query).then(tabs => {
      tabs.forEach(tab => {
        this.browser.updateTab(tab.id, { muted: true });
      });
    });
  };

  unmuteTabs = () => {
    const query = { muted: true };

    this.browser.getTabs(query).then(tabs => {
      tabs.forEach(tab => {
        const { mutedInfo } = tab;

        if (
          mutedInfo.reason === "extension" &&
          mutedInfo.extensionId === Tabify.ID
        ) {
          this.browser.updateTab(tab.id, { muted: false });
        }
      });
    });
  };
}

export default TabsService;
