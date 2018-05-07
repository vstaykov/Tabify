import TabsManager from './tabs-manager';

class CommandsExecutor {
  constructor() {
    this.tabsManager = new TabsManager();
    this.muted = false;
  }

  executeCommand(command) {
    switch (command) {
      case 'toggle-quite-mode':
      case 'global-toggle-quite-mode':
        this.toggleQuiteMode();
        break;
      default:
        console.log(`Command ${command} detected but not handled.`);
        break;
    }
  }

  toggleQuiteMode() {
    if (this.muted) {
      this.tabsManager.unmuteTabs();
      this.muted = false;
    } else {
      this.tabsManager.muteTabs();
      this.muted = true;
    }
  }
}

export default CommandsExecutor;
