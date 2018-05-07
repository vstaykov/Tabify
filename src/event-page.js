import CommandsExecutor from './commands-executor';

const commandsExecutor = new CommandsExecutor();

chrome.commands.onCommand.addListener((command) => {
  commandsExecutor.executeCommand(command);
});
