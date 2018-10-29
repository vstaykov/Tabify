import React from "react";
import { shallow } from "enzyme";
import ShortcutsSection from "../ShortcutsSection";

describe("<ShortcutsSection />", () => {
  describe("render()", () => {
    describe("when given one shortcut", () => {
      it("render shortcut correctly", () => {
        const props = {
          shortcuts: [
            {
              title: "Foo",
              keys: ["Ctrl"]
            }
          ]
        };

        const component = shallow(<ShortcutsSection {...props} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe("when given several shortcuts", () => {
      it("render all shortcuts correctly", () => {
        const props = {
          shortcuts: [
            {
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
            }
          ]
        };

        const component = shallow(<ShortcutsSection {...props} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
