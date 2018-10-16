import Tabify from "../../tabify";
import Browser from "../browser";
import TabsService from "../tabs-service";

jest.mock("../browser");

describe("tabs-service.js", () => {
  describe("createTab()", () => {
    it("create browser tab with correct parameters", () => {
      const createTabMock = jest.fn();
      Browser.mockImplementation(() => {
        return {
          createTab: createTabMock
        };
      });

      const tabsService = new TabsService();
      tabsService.createTab("foo", true);
      tabsService.createTab("bar", false);

      expect(createTabMock).toHaveBeenCalledTimes(2);
      expect(createTabMock).toBeCalledWith("foo", true);
      expect(createTabMock).toBeCalledWith("bar", false);
    });
  });

  describe("muteTabs()", () => {
    it("get only unmuted browser tabs", async () => {
      const getTabsMock = jest.fn(() => {
        return Promise.resolve([]);
      });
      Browser.mockImplementation(() => {
        return {
          getTabs: getTabsMock
        }
      });

      const tabsService = new TabsService();
      await tabsService.muteTabs();

      expect(getTabsMock).toHaveBeenCalledTimes(1);
      expect(getTabsMock).toBeCalledWith({ muted: false });
    });

    it("mute all unmuted browser tabs", async () => {
      const updateTabMock = jest.fn();
      Browser.mockImplementation(() => {
        return {
          getTabs: () => {
            return Promise.resolve([{
              id: "tab#1"
            },
            {
              id: "tab#2"
            }]);
          },
          updateTab: updateTabMock
        }
      });

      const tabsService = new TabsService();
      await tabsService.muteTabs();

      expect(updateTabMock).toHaveBeenCalledTimes(2);
      expect(updateTabMock).toBeCalledWith("tab#1", { muted: true });
      expect(updateTabMock).toBeCalledWith("tab#2", { muted: true });
    });
  });

  describe("unmuteTabs()", () => {
    it("get only muted browser tabs", async () => {
      const getTabsMock = jest.fn(() => {
        return Promise.resolve([]);
      });
      Browser.mockImplementation(() => {
        return {
          getTabs: getTabsMock
        }
      });

      const tabsService = new TabsService();
      await tabsService.unmuteTabs();

      expect(getTabsMock).toHaveBeenCalledTimes(1);
      expect(getTabsMock).toBeCalledWith({ muted: true });
    });

    it("not unmute browser tabs when not muted by extension", async () => {
      const updateTabMock = jest.fn();
      Browser.mockImplementation(() => {
        return {
          getTabs: () => {
            return Promise.resolve([{
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
            }]);
          },
          updateTab: updateTabMock
        }
      });

      const tabsService = new TabsService();
      await tabsService.unmuteTabs();

      expect(updateTabMock).toHaveBeenCalledTimes(0);
    });

    it("not unmute browser tabs when not muted by Tabify extension", async () => {
      const updateTabMock = jest.fn();
      Browser.mockImplementation(() => {
        return {
          getTabs: () => {
            return Promise.resolve([{
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
            }]);
          },
          updateTab: updateTabMock
        }
      });

      const tabsService = new TabsService();
      await tabsService.unmuteTabs();

      expect(updateTabMock).toHaveBeenCalledTimes(0);
    });

    it("unmute browser tabs when muted by Tabify extension", async () => {
      const updateTabMock = jest.fn();
      Browser.mockImplementation(() => {
        return {
          getTabs: () => {
            return Promise.resolve([{
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
            }]);
          },
          updateTab: updateTabMock
        }
      });

      const tabsService = new TabsService();
      await tabsService.unmuteTabs();

      expect(updateTabMock).toHaveBeenCalledTimes(2);
      expect(updateTabMock).toBeCalledWith("tab#1", { muted: false });
      expect(updateTabMock).toBeCalledWith("tab#2", { muted: false });
    });
  });
});
