import React from "react";
import PropTypes from "prop-types";

class WebpageForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      title: "",
      pageUrl: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePageUrlChange = this.handlePageUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
    event.preventDefault();
  }

  handlePageUrlChange(event) {
    this.setState({ pageUrl: event.target.value });
    event.preventDefault();
  }

  handleSubmit(event) {
    this.props.submit(this.state.title, this.state.pageUrl);
    event.preventDefault();
  }

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

        <input type="submit" value="Add" />
      </form>
    );
  }
}

WebpageForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default WebpageForm;
