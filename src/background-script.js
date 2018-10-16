import CommandsExecutor from "./utils/commands-executor";

const commandsExecutor = new CommandsExecutor();

chrome.commands.onCommand.addListener(command => {
  commandsExecutor.executeCommand(command);
});
