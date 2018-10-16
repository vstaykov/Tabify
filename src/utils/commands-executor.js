import TabsService from "./tabs-service";
import WebPageStorageService from "./webpage-storage-service";

class CommandsExecutor {
  constructor() {
    this.tabsService = new TabsService();
    this.webPageStorageService = new WebPageStorageService();
    this.muted = false;
  }

  executeCommand = async command => {
    switch (command) {
      case "toggle-quite-mode":
      case "global-toggle-quite-mode":
        await this.toggleQuiteMode();
        break;
      case "open-saved-web-pages":
        await this.openSavedWebPages();
        break;
      default:
        console.log(`Command ${command} detected but not handled.`);
        break;
    }
  };

  toggleQuiteMode = async () => {
    if (this.muted) {
      await this.tabsService.unmuteTabs();
      this.muted = false;
    } else {
      await this.tabsService.muteTabs();
      this.muted = true;
    }
  };

  openSavedWebPages = async () => {
    const webPages = await this.webPageStorageService.getWebPages();

    webPages.forEach(webPage => {
      this.tabsService.createTab(webPage.url, webPage.isPinned);
    });
  };
}

export default CommandsExecutor;
