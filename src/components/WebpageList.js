import React from "react";
import PropTypes from "prop-types";
import WebpageListItem from "./WebpageListItem/WebpageListItem";

const WebpageList = ({ webPages, maxWebPagesCount, deleteWebPage }) => (
  <div>
    <div>
      <span>Saved Web Pages</span>
      <span>
        {webPages.length}/{maxWebPagesCount}
      </span>
    </div>
    {webPages.map(webPage => (
      <WebpageListItem
        key={webPage.id}
        {...webPage}
        handleDelete={deleteWebPage}
      />
    ))}
  </div>
);

WebpageList.propTypes = {
  webPages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      isPinned: PropTypes.bool.isRequired
    })
  ).isRequired,
  maxWebPagesCount: PropTypes.number.isRequired,
  deleteWebPage: PropTypes.func.isRequired
};

export default WebpageList;
