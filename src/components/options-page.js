import React from "react";
import WebPageForm from "./webpage-form";
import WebPageList from "./webpage-list";
import WebPageStorageService from "./../utilities/webpage-storage-service";

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { webPages: [] };
  }

  componentWillMount() {
    this.updateWebPages();
  }

  handleFormSubmit = (title, url, pinned) => {
    WebPageStorageService.saveWebPage(title, url, pinned).then(() => {
      this.updateWebPages();
    });
  };

  updateWebPages = () => {
    WebPageStorageService.getWebPages().then(pages => {
      if (pages !== undefined) {
        this.setState({ webPages: pages });
      }
    });
  };

  render() {
    return (
      <div>
        <WebPageForm submit={this.handleFormSubmit} />
        <WebPageList webPages={this.state.webPages} />
      </div>
    );
  }
}

export default OptionsPage;
