'use strict';

import { CommandsExecutor } from "./CommandsExecutor.js"

let commandsExecutor = new CommandsExecutor();

chrome.commands.onCommand.addListener(function (command) {
  commandsExecutor.executeCommand(command);
});