import React from "react";
import OptionsPage from "./OptionsPage";
import webpageStorageService from "../../utils/webpage-storage-service";

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
    await webpageStorageService.saveWebpage(url, pinned);

    this.updateWebpages();
  };

  updateWebpages = async () => {
    const pages = await webpageStorageService.getWebpages();

    if (pages) {
      this.setState({ webpages: pages });
    }
  };

  deleteWebPage = async webpage => {
    await webpageStorageService.deleteWebpage(webpage);

    this.updateWebpages();
  };

  render() {
    const { webpages } = this.state;

    return React.createElement(OptionsPage, {
      webpages,
      webpagesMaxCount,
      deleteWebpage: this.deleteWebPage,
      webpagesFormEnabled: webpages.length < webpagesMaxCount,
      submitWebpagesForm: this.submitWebpagesForm
    });
  }
}

export default OptionsPageContainer;
