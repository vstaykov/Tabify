import React from "react";
import PropTypes from "prop-types";
import WebPageForm from "./WebpageForm";

const URLREGEX = /^(ftp|http|https):\/\/[^ "]+$/;
const INVALIDURLMESSAGE =
  "Please provide a valid URL in the format ftp|http|https://<url with no spaces or quotes>";

class WebpageFormContainer extends React.Component {
  constructor(props) {
    super(props);

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

  handleSubmitForm = event => {
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
    const { pageUrl, pinned, urlDataIsValid } = this.state;
    const { enabled } = this.props;
    const invalidDataMessage = urlDataIsValid ? "" : INVALIDURLMESSAGE;

    return React.createElement(WebPageForm, {
      enabled,
      handleSubmitForm: this.handleSubmitForm,
      pageUrl,
      handlePageUrlChange: this.handlePageUrlChange,
      pinned,
      handlePinnedChange: this.handlePinnedChange,
      invalidDataMessage
    });
  }
}

WebpageFormContainer.propTypes = {
  submit: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired
};

export default WebpageFormContainer;
