import React from "react";
import WebPageForm from "./WebpageForm";
import WebPageList from "./WebpageList";
import webPageStorageService from "./../utils/webpage-storage-service";

const maxWebPagesCount = 10;

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { webPages: [] };
  }

  componentDidMount() {
    this.updateWebPages();
  }

  handleFormSubmit = (url, pinned) => {
    webPageStorageService.saveWebPage(url, pinned).then(() => {
      this.updateWebPages();
    });
  };

  updateWebPages = () => {
    webPageStorageService.getWebPages().then(pages => {
      if (pages !== undefined) {
        this.setState({ webPages: pages });
      }
    });
  };

  deleteWebPage = webPage => {
    webPageStorageService.deleteWebPage(webPage).then(() => {
      this.updateWebPages();
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
          deleteWebPage={this.deleteWebPage}
        />
      </div>
    );
  }
}

export default OptionsPage;
