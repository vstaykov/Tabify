import React from "react";
import OptionsPage from "./OptionsPage";
import webPageStorageService from "../../utils/webpage-storage-service";

const webpagesMaxCount = 10;

class OptionsPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { webpages: [] };
  }

  componentDidMount() {
    this.updateWebpages();
  }

  submitWebpagesForm = async (url, pinned) => {
    await webPageStorageService.saveWebPage(url, pinned);

    this.updateWebpages();
  };

  updateWebpages = async () => {
    const pages = await webPageStorageService.getWebPages();

    if (pages) {
      this.setState({ webpages: pages });
    }
  };

  deleteWebPage = async webpage => {
    await webPageStorageService.deleteWebPage(webpage);

    this.updateWebpages();
  };

  render() {
    return React.createElement(OptionsPage, {
      webpages: this.state.webpages,
      webpagesMaxCount,
      deleteWebpage: this.deleteWebPage,
      webpagesFormEnabled: this.state.webpages.length < webpagesMaxCount,
      submitWebpagesForm: this.submitWebpagesForm
    });
  }
}

export default OptionsPageContainer;
