import React from "react";
import WebPageForm from "./webpage-form";

const OptionsPage = () => (
  <div>
    <WebPageForm
      submit={(title, pageUrl) => {
        console.log(`Title: ${title}; PageUrl: ${pageUrl}`);
      }}
    />
  </div>
);

export default OptionsPage;
