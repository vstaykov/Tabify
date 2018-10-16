import TabsService from "../tabs-service";
import WebPageStorageService from "../webpage-storage-service";
import CommandsExecutor from "../commands-executor";

jest.mock("../tabs-service");
jest.mock("../webpage-storage-service");

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
      it("do nothing and writes to the console the unknown command name", async () => {
        const consoleLogSpy = jest.spyOn(global.console, "log").mockImplementation(() => { });

        const unknownCommand = "foo";
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(unknownCommand);

        expect(TabsService).toHaveBeenCalledTimes(1);
        expect(WebPageStorageService).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toBeCalled();
        expect(consoleLogSpy.mock.calls[0][0]).toContain(unknownCommand);
      });
    });

    describe(`when given ${toggleQuiteModeCommand} command`, () => {
      it("mute tabs if not alaready muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1)
      });

      it("unmute tabs if already muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${globalToggleQuiteModeCommand} command`, async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${globalToggleQuiteModeCommand} command`, () => {
      it("mute tabs if not alaready muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1)
      });

      it("unmute tabs if already muted", async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });

      it(`unmute tabs if already muted by ${toggleQuiteModeCommand} command`, async () => {
        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(toggleQuiteModeCommand);
        await commandsExecutor.executeCommand(globalToggleQuiteModeCommand);

        expect(muteTabsMock).toHaveBeenCalledTimes(1);
        expect(unmuteTabsMock).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when given ${openSavedWebPagesCommand} command`, () => {
      it("get and open the saved web pages", async () => {

        WebPageStorageService.mockImplementation(() => {
          return {
            getWebPages: () => {
              return Promise.resolve([{
                url: "foo",
                isPinned: true
              }, {
                url: "bar",
                isPinned: false
              }]);
            }
          }
        });

        const commandsExecutor = new CommandsExecutor();
        await commandsExecutor.executeCommand(openSavedWebPagesCommand);

        expect(createTabMock).toHaveBeenCalledTimes(2);
        expect(createTabMock).toBeCalledWith("foo", true);
        expect(createTabMock).toBeCalledWith("bar", false);
      });
    });
  });
});
