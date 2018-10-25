import tabsService from "../tabs-service";
import webpageStorageService from "../webpage-storage-service";
import CommandsExecutor from "../commands-executor";
import commandsData from "../../data/commands-data";

jest.mock("../browser", () => ({
  __esModule: true,
  default: {}
}));
jest.mock("../tabs-service", () => ({
  __esModule: true,
  default: {
    muteTabs: jest.fn(),
    unmuteTabs: jest.fn(),
    createTab: jest.fn()
  }
}));
jest.mock("../webpage-storage-service", () => ({
  __esModule: true,
  default: {
    getWebpages: jest.fn()
  }
}));

beforeEach(() => {
  webpageStorageService.getWebpages.mockClear();
  tabsService.muteTabs.mockClear();
  tabsService.unmuteTabs.mockClear();
  tabsService.createTab.mockClear();
});

describe("commands-executor.js", () => {
  describe("executeCommand()", () => {
    describe("when given unknown command", () => {
      it("do nothing and writes to the console the unknown command name", async () => {
        const consoleLogSpy = jest
          .spyOn(global.console, "log")
          .mockImplementation(() => {});

        const unknownCommand = "foo";
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(unknownCommand);

        expect(consoleLogSpy).toBeCalled();
        expect(consoleLogSpy.mock.calls[0][0]).toContain(unknownCommand);
      });
    });

    describe(`when given ${commandsData.toggleQuietMode.id} command`, () => {
      it("mute tabs if not alaready muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.toggleQuietMode.id);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
      });

      it("unmute tabs if already muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.toggleQuietMode.id);
        await commandsExecutor.executeCommand(commandsData.toggleQuietMode.id);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${commandsData.globalToggleQuietMode.id} command`, async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.globalToggleQuietMode.id);
        await commandsExecutor.executeCommand(commandsData.toggleQuietMode.id);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${commandsData.globalToggleQuietMode.id} command`, () => {
      it("mute tabs if not alaready muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.globalToggleQuietMode.id);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
      });

      it("unmute tabs if already muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.globalToggleQuietMode.id);
        await commandsExecutor.executeCommand(commandsData.globalToggleQuietMode.id);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${commandsData.toggleQuietMode.id} command`, async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.toggleQuietMode.id);
        await commandsExecutor.executeCommand(commandsData.globalToggleQuietMode.id);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${commandsData.openSavedWebPages.id} command`, () => {
      it("get and open the saved web pages", async () => {
        webpageStorageService.getWebpages.mockImplementation(() =>
          Promise.resolve([
            {
              url: "foo",
              isPinned: true
            },
            {
              url: "bar",
              isPinned: false
            }
          ])
        );

        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(commandsData.openSavedWebPages.id);

        expect(tabsService.createTab).toHaveBeenCalledTimes(2);
        expect(tabsService.createTab).toBeCalledWith("foo", true);
        expect(tabsService.createTab).toBeCalledWith("bar", false);
      });
    });
  });
});
