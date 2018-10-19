import React from "react";
import PropTypes from "prop-types";
import WebpageFormContainer from "../WebpageForm/WebpageFormContainer";
import WebpageList from "../WebpageList";

const OptionsPage = ({
  webpages,
  webpagesMaxCount,
  deleteWebpage,
  webpagesFormEnabled,
  submitWebpagesForm
}) => (
  <div>
    <WebpageFormContainer
      submit={submitWebpagesForm}
      enabled={webpagesFormEnabled}
    />
    <WebpageList
      webPages={webpages}
      maxWebPagesCount={webpagesMaxCount}
      deleteWebPage={deleteWebpage}
    />
  </div>
);

OptionsPage.propTypes = {
  webpages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  webpagesMaxCount: PropTypes.number.isRequired,
  deleteWebpage: PropTypes.func.isRequired,
  webpagesFormEnabled: PropTypes.bool.isRequired,
  submitWebpagesForm: PropTypes.func.isRequired
};

export default OptionsPage;
