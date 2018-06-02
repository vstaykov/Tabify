import React from "react";
import PropTypes from "prop-types";

const WebPageList = props =>
  props.webPages.map(webPage => {
    const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${
      webPage.pageUrl
    }/&amp;alt=s&amp;sz=16`;

    let thumbnailElement = (
      <div className="thumbnail-container default-thumbnail" />
    );

    if (webPage.thumbnailSrc && webPage.thumbnailSrc !== "") {
      thumbnailElement = (
        <div className="thumbnail-container">
          <img src={webPage.thumbnailSrc} alt={webPage.pageUrl} />
        </div>
      );
    }

    return (
      <div key={webPage.pageUrl}>
        <div>
          <img src={favIconUrl} title="" alt="" />
          {webPage.title}
        </div>
        {thumbnailElement}
        <div>
          <i className="fa fa-trash" />
          <label htmlFor="slider" className="switch">
            <input id="slider" type="checkbox" checked="" />
            <span className="slider round" />
          </label>
        </div>
      </div>
    );
  });

WebPageList.propTypes = {
  webPages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      pageUrl: PropTypes.string.isRequired
    })
  ).isRequired
};

export default WebPageList;
