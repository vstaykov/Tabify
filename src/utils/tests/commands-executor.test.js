import tabsService from "../tabs-service";
import WebPageStorageService from "../webpage-storage-service";
import CommandsExecutor from "../commands-executor";

jest.mock("../webpage-storage-service");
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

const toggleQuiteModeCommand = "toggle-quite-mode";
const globalToggleQuiteModeCommand = "global-toggle-quite-mode";
const openSavedWebPagesCommand = "open-saved-web-pages";

beforeAll(() => {
  WebPageStorageService.mockImplementation(() => {
    return {
      getWebPages: jest.fn()
    };
  });
});

beforeEach(() => {
  WebPageStorageService.mockClear();
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

        expect(WebPageStorageService).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toBeCalled();
        expect(consoleLogSpy.mock.calls[0][0]).toContain(unknownCommand);
      });
    });

    describe(`when given ${toggleQuiteModeCommand} command`, () => {
      it("mute tabs if not alaready muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
      });

      it("unmute tabs if already muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${globalToggleQuiteModeCommand} command`, async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${globalToggleQuiteModeCommand} command`, () => {
      it("mute tabs if not alaready muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
      });

      it("unmute tabs if already muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${toggleQuiteModeCommand} command`, async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(tabsService.muteTabs).toHaveBeenCalledTimes(1);
        expect(tabsService.unmuteTabs).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${openSavedWebPagesCommand} command`, () => {
      it("get and open the saved web pages", async () => {
        WebPageStorageService.mockImplementation(() => {
          return {
            getWebPages: () =>
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
          };
        });

        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(openSavedWebPagesCommand);

        expect(tabsService.createTab).toHaveBeenCalledTimes(2);
        expect(tabsService.createTab).toBeCalledWith("foo", true);
        expect(tabsService.createTab).toBeCalledWith("bar", false);
      });
    });
  });
});
