const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const distFolder = "dist";

module.exports = {
  distFolder: resolveApp(`${distFolder}`),
  distJsFolder: resolveApp(`${distFolder}/js`),
  manifest: resolveApp(`${distFolder}/manifest.json`),
  manifestTemplate: resolveApp("scripts/templates/manifest.template.json")
};
