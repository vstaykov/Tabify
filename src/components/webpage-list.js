import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const WebPageList = props => (
  <div>
    <div>
      <span>Saved Web Pages</span>
      <span>
        {props.webPages.length}/{props.maxWebPagesCount}
      </span>
    </div>
    {props.webPages.map(webPage => {
      const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${
        webPage.pageUrl
      }/&amp;alt=s&amp;sz=16`;

      return (
        <div key={webPage.pageUrl}>
          <div>
            <img src={favIconUrl} title="" alt="" />
            <a href={webPage.pageUrl} target="_blank" rel="noopener noreferrer">
              {webPage.pageUrl}
            </a>
          </div>
          <div>
            <label htmlFor="slider" className="switch">
              <input
                id="slider"
                type="checkbox"
                checked={webPage.isPinned}
                readOnly="true"
              />
              <span className="slider round" />
            </label>
            <button onClick={() => props.deleteWebPage(webPage)}>
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

WebPageList.propTypes = {
  webPages: PropTypes.arrayOf(
    PropTypes.shape({
      pageUrl: PropTypes.string.isRequired,
      isPinned: PropTypes.bool.isRequired
    })
  ).isRequired,
  maxWebPagesCount: PropTypes.number.isRequired,
  deleteWebPage: PropTypes.func.isRequired
};

export default WebPageList;
