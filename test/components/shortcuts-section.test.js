import React from "react";
import ShortcutsSection from "../../src/components/shortcuts-section";
import renderer from "react-test-renderer";

describe("<ShortcutsSection />", () => {
  describe("render()", () => {
    describe("when given one shortcut", () => {
      it("render shortcut correctly", () => {
        const props = {
         shortcuts: [{
          title: "Foo",
          keys: ["Ctrl"]
         }]
        };

        const tree = renderer.create(<ShortcutsSection {...props} />).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });

    describe("when given several shortcuts", () => {
      it("render all shortcuts correctly", () => {
        const props = {
          shortcuts: [{
           title: "Foo",
           keys: ["Ctrl"]
          },
          {
            title: "Bar",
            keys: ["Alt", "Q"]
          },
          {
            title: "FooBar",
            keys: ["Ctrl", "Shift", "Alt", "Q"]
          }]
         };

        const tree = renderer.create(<ShortcutsSection {...props} />).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
