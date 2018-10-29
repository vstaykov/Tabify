import React from "react";
import { shallow } from "enzyme";
import Shortcut from "../Shortcut";

describe("<Shortcut />", () => {
  describe("render()", () => {
    describe("when given one key", () => {
      it("render key correctly", () => {
        const props = {
          title: "Foo",
          keys: ["Ctrl"]
        };
        const component = shallow(<Shortcut {...props} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe("when given several keys", () => {
      it("render all keys correctly", () => {
        const props = {
          title: "Foo",
          keys: ["Ctrl", "Shift", "Alt", "Q"]
        };
        const component = shallow(<Shortcut {...props} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
