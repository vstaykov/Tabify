import React from "react";
import PropTypes from "prop-types";

const URLREGEX = /^(ftp|http|https):\/\/[^ "]+$/;
const INVALIDURLMESSAGE =
  "Please provide a valid URL in the format ftp|http|https://<url with no spaces or quotes>";

class WebpageForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      pageUrl: "",
      pinned: false,
      urlDataIsValid: true
    };
  }

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

    if (this.validateUrlData()) {
      this.props.submit(this.state.pageUrl, this.state.pinned);
      this.setState({
        pageUrl: "",
        pinned: false,
        urlDataIsValid: true
      });
    } else {
      this.setState({
        urlDataIsValid: false
      });
    }
  };

  validateUrlData = () => {
    const urlIsValid = URLREGEX.test(this.state.pageUrl);
    return urlIsValid;
  };

  render() {
    return (
      <form ref={this.formElement} onSubmit={this.handleSubmit}>
        <div>
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

          <input type="submit" value="Add" disabled={!this.props.enabled} />
        </div>
        {this.state.urlDataIsValid ? null : (
          <div className="invalid-form-data">{INVALIDURLMESSAGE}</div>
        )}
      </form>
    );
  }
}

WebpageForm.propTypes = {
  submit: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired
};

export default WebpageForm;
