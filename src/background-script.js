import CommandsExecutor from "./utilities/commands-executor";

const commandsExecutor = new CommandsExecutor();

chrome.commands.onCommand.addListener(command => {
  commandsExecutor.executeCommand(command);
});
