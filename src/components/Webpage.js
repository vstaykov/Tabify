import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Webpage extends React.PureComponent {
  handleDelete = () => {
    this.props.handleDelete(this.props.id);
  };

  render() {
    const { url, isPinned } = this.props;
    const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}/&amp;alt=s&amp;sz=16`;

    return (
      <div>
        <div>
          <img src={favIconUrl} title="" alt="" />
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
        <div>
          <label htmlFor="slider" className="switch">
            <input
              id="slider"
              type="checkbox"
              checked={isPinned}
              readOnly="true"
            />
            <span className="slider round" />
          </label>
          <button onClick={this.handleDelete}>
            <FontAwesomeIcon icon={faTrash} size="xs" />
          </button>
        </div>
      </div>
    );
  }
}

Webpage.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Webpage;
