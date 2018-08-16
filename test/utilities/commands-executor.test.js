import TabsService from "../../src/utilities/tabs-service";
import WebPageStorageService from "../../src/utilities/webpage-storage-service";
import CommandsExecutor from "../../src/utilities/commands-executor";

jest.mock("../../src/utilities/tabs-service");
jest.mock("../../src/utilities/webpage-storage-service");

const toggleQuiteModeCommand = "toggle-quite-mode";
const globalToggleQuiteModeCommand = "global-toggle-quite-mode";
const openSavedWebPagesCommand = "open-saved-web-pages";

const muteTabsMock = jest.fn();
const unmuteTabsMock = jest.fn();
const createTabMock = jest.fn();

beforeAll(() => {
  TabsService.mockImplementation(() => {
    return {
      muteTabs: muteTabsMock,
      unmuteTabs: unmuteTabsMock,
      createTab: createTabMock
    }
  });

  WebPageStorageService.mockImplementation(() => {
    return {
      getWebPages: jest.fn()
    }
  });
});

beforeEach(() => {
  TabsService.mockClear();
  WebPageStorageService.mockClear();
  muteTabsMock.mockClear();
  unmuteTabsMock.mockClear();
  createTabMock.mockClear();
});

describe("commands-executor.js", () => {
  describe("executeCommand()", () => {

    describe("when given unknown command", () => {
      it("do nothing and writes to the console the unknown command name", () => {
        const consoleLogSpy = jest.spyOn(global.console, "log").mockImplementation(() => { });

        const unknownCommand = "foo";
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(unknownCommand);

        expect(TabsService).toHaveBeenCalledTimes(1);
        expect(WebPageStorageService).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toBeCalled();
        expect(consoleLogSpy.mock.calls[0][0]).toContain(unknownCommand);
      });
    });

    describe(`when given ${toggleQuiteModeCommand} command`, () => {
      it("mute tabs if not alaready muted", () => {
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1)
      });

      it("unmute tabs if already muted", () => {
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(toggleQuiteModeCommand);
        commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${globalToggleQuiteModeCommand} command`, () => {
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(globalToggleQuiteModeCommand);
        commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${globalToggleQuiteModeCommand} command`, () => {
      it("mute tabs if not alaready muted", () => {
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1)
      });

      it("unmute tabs if already muted", () => {
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(globalToggleQuiteModeCommand);
        commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${toggleQuiteModeCommand} command`, () => {
        const commandsExecutor = new CommandsExecutor();
        commandsExecutor.executeCommand(toggleQuiteModeCommand);
        commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${openSavedWebPagesCommand} command`, () => {
      it("gets and opens the saved web pages", async () => {

        WebPageStorageService.mockImplementation(() => {
          return {
            getWebPages: () => {
              return Promise.resolve([{
                pageUrl: "foo",
                isPinned: true
              }, {
                pageUrl: "bar",
                isPinned: false
              }]);
            }
          }
        });

        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(openSavedWebPagesCommand);

        expect(createTabMock).toHaveBeenCalledTimes(2);
        expect(createTabMock.mock.calls[0][0]).toBe("foo");
        expect(createTabMock.mock.calls[0][1]).toBe(true);
        expect(createTabMock.mock.calls[1][0]).toBe("bar");
        expect(createTabMock.mock.calls[1][1]).toBe(false);
      });
    });
  });
});
