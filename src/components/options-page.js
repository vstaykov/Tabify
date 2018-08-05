import React from "react";
import WebPageForm from "./webpage-form";
import WebPageList from "./webpage-list";
import WebPageStorageService from "./../utilities/webpage-storage-service";

const maxWebPagesCount = 10;

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { webPages: [] };
    this.webPageStorageService = new WebPageStorageService();
  }

  componentWillMount() {
    this.updateWebPages();
  }

  handleFormSubmit = (url, pinned) => {
    this.webPageStorageService.saveWebPage(url, pinned).then(() => {
      this.updateWebPages();
    });
  };

  updateWebPages = () => {
    this.webPageStorageService.getWebPages().then(pages => {
      if (pages !== undefined) {
        this.setState({ webPages: pages });
      }
    });
  };

  render() {
    return (
      <div>
        <WebPageForm
          submit={this.handleFormSubmit}
          enabled={this.state.webPages.length < maxWebPagesCount}
        />
        <WebPageList
          webPages={this.state.webPages}
          maxWebPagesCount={maxWebPagesCount}
        />
      </div>
    );
  }
}

export default OptionsPage;
