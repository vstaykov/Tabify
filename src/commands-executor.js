import TabsService from "./tabs-service";

class CommandsExecutor {
  constructor() {
    this.tabsService = new TabsService();
    this.muted = false;
  }

  executeCommand(command) {
    switch (command) {
      case "toggle-quite-mode":
      case "global-toggle-quite-mode":
        this.toggleQuiteMode();
        break;
      default:
        console.log(`Command ${command} detected but not handled.`);
        break;
    }
  }

  toggleQuiteMode() {
    if (this.muted) {
      this.tabsService.unmuteTabs();
      this.muted = false;
    } else {
      this.tabsService.muteTabs();
      this.muted = true;
    }
  }
}

export default CommandsExecutor;
