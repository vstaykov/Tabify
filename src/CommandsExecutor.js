'use strict';

import { TabsManager } from "./TabsManager.js";

class CommandsExecutor {

    constructor() {
        this.tabsManager = new TabsManager();
        this.muted = false;
    }

    executeCommand(command) {
        switch (command) {
            case "toggle-quite-mode":
                this._toggleQuiteMode();
                break;
            default:
                console.log(`Command ${command} detected but not handled.`)
                break;
        }
    }

    _toggleQuiteMode() {
        if (this.muted) {
            this.tabsManager.unmuteTabs();
            this.muted = false;
        } else {
            this.tabsManager.muteTabs();
            this.muted = true;
        }
    }
}

export { CommandsExecutor }