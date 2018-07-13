import React from "react";
import PropTypes from "prop-types";

class WebpageForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      title: "",
      pageUrl: "",
      pinned: false
    };
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
    event.preventDefault();
  };

  handlePageUrlChange = event => {
    this.setState({ pageUrl: event.target.value });
    event.preventDefault();
  };

  handlePinnedChange = event => {
    this.setState({ pinned: event.target.checked });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.submit(this.state.title, this.state.pageUrl, this.state.pinned);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </label>
        <label htmlFor="pageUrl">
          Page URL
          <input
            id="pageUrl"
            type="text"
            value={this.state.pageUrl}
            onChange={this.handlePageUrlChange}
          />
        </label>
        <label htmlFor="pinned" className="switch">
          Pinned
          <input
            id="pinned"
            type="checkbox"
            checked={this.state.pinned}
            onChange={this.handlePinnedChange}
          />
          <span className="slider round" />
        </label>

        <input type="submit" value="Add" />
      </form>
    );
  }
}

WebpageForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default WebpageForm;
