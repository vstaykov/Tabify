import React from "react";
import PropTypes from "prop-types";
import WebPage from "./Webpage";

const WebPageList = props => (
  <div>
    <div>
      <span>Saved Web Pages</span>
      <span>
        {props.webPages.length}/{props.maxWebPagesCount}
      </span>
    </div>
    {props.webPages.map(webPage => (
      <WebPage
        key={webPage.id}
        {...webPage}
        handleDelete={props.deleteWebPage}
      />
    ))}
  </div>
);

WebPageList.propTypes = {
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

export default WebPageList;
