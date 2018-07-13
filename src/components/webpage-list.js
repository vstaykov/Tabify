import React from "react";
import PropTypes from "prop-types";

const WebPageList = props =>
  props.webPages.map(webPage => {
    const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${
      webPage.pageUrl
    }/&amp;alt=s&amp;sz=16`;

    return (
      <div key={webPage.pageUrl}>
        <div>
          <img src={favIconUrl} title="" alt="" />
          {webPage.pageUrl}
        </div>
        <div>
          <i className="fa fa-trash" />
          <label htmlFor="slider" className="switch">
            <input
              id="slider"
              type="checkbox"
              checked={webPage.isPinned}
              readOnly="true"
            />
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
      pageUrl: PropTypes.string.isRequired,
      isPinned: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default WebPageList;
