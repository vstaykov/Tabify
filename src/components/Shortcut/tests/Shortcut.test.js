import React from "react";
import renderer from "react-test-renderer";
import Shortcut from "../Shortcut";

describe("<Shortcut />", () => {
  describe("render()", () => {
    describe("when given one key", () => {
      it("render key correctly", () => {
        const props = {
          title: "Foo",
          keys: ["Ctrl"]
        };
        const tree = renderer.create(<Shortcut {...props} />).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });

    describe("when given several keys", () => {
      it("render all keys correctly", () => {
        const props = {
          title: "Foo",
          keys: ["Ctrl", "Shift", "Alt", "Q"]
        };
        const tree = renderer.create(<Shortcut {...props} />).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
