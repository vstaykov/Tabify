import React from "react";
import { shallow } from "enzyme";
import WebpageListItem from "./../WebpageListItem";

describe("<WebPageListItem />", () => {
  let props;

  beforeEach(() => {
    props = {
      id: "",
      url: "",
      isPinned: true,
      handleDelete: () => {}
    };
  });

  describe("when isPinned is true", () => {
    it("should render correctly", () => {
      props.id = "fooID";
      props.url = "foo";
      props.isPinned = true;
      props.handleDelete = () => {};

      const component = shallow(<WebpageListItem {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when isPinned is false", () => {
    it("should render correctly", () => {
      props.id = "fooID";
      props.url = "foo";
      props.isPinned = false;
      props.handleDelete = () => {};

      const component = shallow(<WebpageListItem {...props} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe("when delete button is clicked", () => {
    it("should call handleDelete() with correct arguments", () => {
      props.id = "fooID";
      props.handleDelete = jest.fn();

      const component = shallow(<WebpageListItem {...props} />);
      const deleteButton = component.find("button");

      deleteButton.simulate("click");

      expect(props.handleDelete).toBeCalledTimes(1);
      expect(props.handleDelete).toBeCalledWith(props.id);
    });
  });
});
