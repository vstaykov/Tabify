'use strict';

import { CommandsExecutor } from "./commands-executor.js"

let commandsExecutor = new CommandsExecutor();

chrome.commands.onCommand.addListener(function (command) {
  commandsExecutor.executeCommand(command);
});