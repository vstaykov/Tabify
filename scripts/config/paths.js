const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const distFolder = "dist";

module.exports = {
  distFolder: resolveApp(`${distFolder}`)
};
