import React from "react";
import PropTypes from "prop-types";

const WebpageForm = ({
  enabled,
  handleSubmitForm,
  pageUrl,
  handlePageUrlChange,
  pinned,
  handlePinnedChange,
  invalidDataMessage
}) => (
  <form onSubmit={handleSubmitForm}>
    <div>
      <label htmlFor="pageUrl">
        Page URL
        <input
          id="pageUrl"
          type="text"
          value={pageUrl}
          onChange={handlePageUrlChange}
        />
      </label>
      <label htmlFor="pinned" className="switch">
        Pinned
        <input
          id="pinned"
          type="checkbox"
          checked={pinned}
          onChange={handlePinnedChange}
        />
        <span className="slider round" />
      </label>

      <input type="submit" value="Add" disabled={!enabled} />
    </div>
    {invalidDataMessage && (
      <div className="invalid-form-data">{invalidDataMessage}</div>
    )}
  </form>
);

WebpageForm.propTypes = {
  enabled: PropTypes.bool.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  pageUrl: PropTypes.string.isRequired,
  handlePageUrlChange: PropTypes.func.isRequired,
  pinned: PropTypes.bool.isRequired,
  handlePinnedChange: PropTypes.func.isRequired,
  invalidDataMessage: PropTypes.string.isRequired
};

export default WebpageForm;
