import React from "react";
import { shallow } from "enzyme";
import WebpageForm from "./../WebpageForm";

describe("<WebpageForm />", () => {
  let props;

  beforeEach(() => {
    props = {
      enabled: true,
      handleSubmitForm: () => {},
      pageUrl: "foo",
      handlePageUrlChange: () => {},
      pinned: true,
      handlePinnedChange: () => {},
      invalidDataMessage: ""
    };
  });

  describe("when invalid data message not provided", () => {
    it("should not render invalid data message section", () => {
      props.invalidDataMessage = "";

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when invalid data message provided", () => {
    it("should render invalid data message", () => {
      props.invalidDataMessage = "data is invalid";

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when enabled is true", () => {
    it("should render submit input enabled", () => {
      props.enabled = true;

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when enabled is false", () => {
    it("should render submit input disabled", () => {
      props.enabled = false;

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when pinned is true", () => {
    it("should render pinned checkbox checked", () => {
      props.pinned = true;

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when pinned is false", () => {
    it("should render pinned checkbox unchecked", () => {
      props.pinned = false;

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when page URL has initial value", () => {
    it("should render the value in page URL input", () => {
      props.pageUrl = "URL";

      const component = shallow(<WebpageForm {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when form submitted", () => {
    it("should call handleSubmitForm()", () => {
      props.handleSubmitForm = jest.fn();

      const component = shallow(<WebpageForm {...props} />);
      const form = component.find("form");

      form.simulate("submit");

      expect(props.handleSubmitForm).toHaveBeenCalledTimes(1);
    });
  });

  describe("when pinned changes", () => {
    it("should call handlePinnedChange()", () => {
      props.pinned = true;
      props.handlePinnedChange = jest.fn();

      const component = shallow(<WebpageForm {...props} />);
      const pinnedCheckbox = component.find("#pinned");

      pinnedCheckbox.simulate("change", { target: { checked: false } });
      pinnedCheckbox.simulate("change", { target: { checked: true } });

      expect(props.handlePinnedChange).toBeCalledTimes(2);
    });
  });

  describe("when page URL changes", () => {
    it("should call handlePageUrlChange()", () => {
      props.pageUrl = "";
      props.handlePageUrlChange = jest.fn();

      const component = shallow(<WebpageForm {...props} />);
      const pageUrlInput = component.find("#pageUrl");

      pageUrlInput.simulate("change", { target: { value: "foo" } });
      pageUrlInput.simulate("change", { target: { value: "bar" } });

      expect(props.handlePageUrlChange).toBeCalledTimes(2);
    });
  });
});
