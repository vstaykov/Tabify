const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const distFolder = "dist";
const publicFolder = "public";

module.exports = {
  distFolder: resolveApp(`${distFolder}`),
  distJsFolder: resolveApp(`${distFolder}/js`),
  distHtmlFolder: resolveApp(`${distFolder}/html`),
  distStylesFolder: resolveApp(`${distFolder}/styles`),
  htmlFolder: resolveApp(`${publicFolder}/html`),
  stylesFolder: resolveApp(`${publicFolder}/styles`),
  manifest: resolveApp(`${distFolder}/manifest.json`),
  manifestTemplate: resolveApp("scripts/templates/manifest.template.json")
};
