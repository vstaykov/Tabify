import React from "react";
import PropTypes from "prop-types";
import WebPageForm from "../WebpageForm";
import WebPageList from "../WebpageList";

const OptionsPage = ({
  webpages,
  webpagesMaxCount,
  deleteWebpage,
  webpagesFormEnabled,
  submitWebpagesForm
}) => (
  <div>
    <WebPageForm submit={submitWebpagesForm} enabled={webpagesFormEnabled} />
    <WebPageList
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
