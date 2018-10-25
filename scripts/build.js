/* eslint-disable no-console */
const parseArgs = require("minimist");
const fs = require("fs");
const del = require("del");
const webpack = require("webpack");
const webpackDevConfig = require("./config/webpack/webpack.config.dev");
const webpackProductionConfig = require("./config/webpack/webpack.config.prod");
const paths = require("./config/paths");
const commandsData = require("./../src/data/commands-data");

const DEV_MODE = "dev";
const PRODUCTION_MODE = "production";
const VALID_MODES = [DEV_MODE, PRODUCTION_MODE];

function ensureDistFolder() {
  del.sync(paths.distFolder);

  fs.mkdirSync(paths.distFolder);
}

function getWebpackConfig(mode) {
  let config;

  switch (mode) {
    case DEV_MODE:
      config = webpackDevConfig;
      break;
    case PRODUCTION_MODE:
      config = webpackProductionConfig;
      break;
    default:
      config = null;
  }

  return config;
}

function handleWebpackBuildResult(err, stats) {
  if (err) {
    console.error(err.stack || err);
  } else if (stats.hasErrors()) {
    console.log(stats.toString("errors-only"));
  } else {
    console.log(
      stats.toString({
        chunks: false,
        colors: true
      })
    );
  }
}

function createExtensionManifest() {
  const manifestTemplateJson = fs.readFileSync(paths.manifestTemplate);
  const manifest = JSON.parse(manifestTemplateJson);
  manifest.commands = {};

  Object.keys(commandsData).forEach(prop => {
    const command = commandsData[prop];

    manifest.commands[command.id] = {
      suggested_key: {
        default: command.defaultKeys,
        mac: command.macKeys
      },
      description: command.description,
      global: command.global
    };
  });

  const manifestJson = JSON.stringify(manifest);
  fs.writeFileSync(paths.manifest, manifestJson);
}

const args = parseArgs(process.argv.slice(2), { string: "mode" });
const mode = args.mode && args.mode.toLowerCase();

if (mode && VALID_MODES.includes(mode)) {
  ensureDistFolder();

  createExtensionManifest();

  const webpackConfig = getWebpackConfig(mode);
  const compiler = webpack(webpackConfig);

  compiler.run(handleWebpackBuildResult);
} else {
  console.error(
    `Unknown build mode. Please use --mode [${VALID_MODES.join(" / ")}]`
  );
}
