import tabsService from "./tabs-service";
import webpageStorageService from "./webpage-storage-service";

class CommandsExecutor {
  constructor() {
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
      await tabsService.unmuteTabs();
      this.muted = false;
    } else {
      await tabsService.muteTabs();
      this.muted = true;
    }
  };

  openSavedWebPages = async () => {
    const webpages = await webpageStorageService.getWebpages();

    webpages.forEach(webpage => {
      tabsService.createTab(webpage.url, webpage.isPinned);
    });
  };
}

export default CommandsExecutor;
