import Tabify from "../../tabify";
import browser from "../browser";
import tabsService from "../tabs-service";

jest.mock("../browser", () => ({
  __esModule: true,
  default: {
    createTab: jest.fn(),
    getTabs: jest.fn(),
    updateTab: jest.fn()
  }
}));

beforeEach(() => {
  browser.createTab.mockClear();
  browser.getTabs.mockClear();
  browser.updateTab.mockClear();
});

describe("tabs-service.js", () => {
  describe("createTab()", () => {
    it("create browser tab with correct parameters", () => {
      tabsService.createTab("foo", true);
      tabsService.createTab("bar", false);

      expect(browser.createTab).toHaveBeenCalledTimes(2);
      expect(browser.createTab).toBeCalledWith("foo", true);
      expect(browser.createTab).toBeCalledWith("bar", false);
    });
  });

  describe("muteTabs()", () => {
    it("get only unmuted browser tabs", async () => {
      browser.getTabs.mockImplementationOnce(() => Promise.resolve([]));

      await tabsService.muteTabs();

      expect(browser.getTabs).toHaveBeenCalledTimes(1);
      expect(browser.getTabs).toBeCalledWith({ muted: false });
    });

    it("mute all unmuted browser tabs", async () => {
      browser.getTabs.mockImplementationOnce(() =>
        Promise.resolve([
          {
            id: "tab#1"
          },
          {
            id: "tab#2"
          }
        ])
      );

      await tabsService.muteTabs();

      expect(browser.updateTab).toHaveBeenCalledTimes(2);
      expect(browser.updateTab).toBeCalledWith("tab#1", { muted: true });
      expect(browser.updateTab).toBeCalledWith("tab#2", { muted: true });
    });
  });

  describe("unmuteTabs()", () => {
    it("get only muted browser tabs", async () => {
      browser.getTabs.mockImplementationOnce(() => Promise.resolve([]));

      await tabsService.unmuteTabs();

      expect(browser.getTabs).toHaveBeenCalledTimes(1);
      expect(browser.getTabs).toBeCalledWith({ muted: true });
    });

    it("not unmute browser tabs when not muted by extension", async () => {
      browser.getTabs.mockImplementationOnce(() =>
        Promise.resolve([
          {
            id: "tab#1",
            mutedInfo: {
              reason: "user",
              extensionId: Tabify.ID
            }
          },
          {
            id: "tab#2",
            mutedInfo: {
              reason: "NOTextension",
              extensionId: Tabify.ID
            }
          }
        ])
      );

      await tabsService.unmuteTabs();

      expect(browser.updateTab).toHaveBeenCalledTimes(0);
    });

    it("not unmute browser tabs when not muted by Tabify extension", async () => {
      browser.getTabs.mockImplementationOnce(() =>
        Promise.resolve([
          {
            id: "tab#1",
            mutedInfo: {
              reason: "extension",
              extensionId: "Taibfy extension"
            }
          },
          {
            id: "tab#2",
            mutedInfo: {
              reason: "extension",
              extensionId: "TabifyID"
            }
          }
        ])
      );

      await tabsService.unmuteTabs();

      expect(browser.updateTab).toHaveBeenCalledTimes(0);
    });

    it("unmute browser tabs when muted by Tabify extension", async () => {
      browser.getTabs.mockImplementationOnce(() =>
        Promise.resolve([
          {
            id: "tab#1",
            mutedInfo: {
              reason: "extension",
              extensionId: Tabify.ID
            }
          },
          {
            id: "tab#2",
            mutedInfo: {
              reason: "extension",
              extensionId: Tabify.ID
            }
          }
        ])
      );

      await tabsService.unmuteTabs();

      expect(browser.updateTab).toHaveBeenCalledTimes(2);
      expect(browser.updateTab).toBeCalledWith("tab#1", { muted: false });
      expect(browser.updateTab).toBeCalledWith("tab#2", { muted: false });
    });
  });
});
