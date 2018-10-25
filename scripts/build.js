/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const parseArgs = require("minimist");
const fse = require("fs-extra");
const chalk = require("chalk");
const webpack = require("webpack");
const webpackDevConfig = require("./config/webpack/webpack.config.dev");
const webpackProductionConfig = require("./config/webpack/webpack.config.prod");
const paths = require("./config/paths");
const commandsData = require("./../src/data/commands-data");

const DEV_MODE = "dev";
const PRODUCTION_MODE = "production";
const VALID_MODES = [DEV_MODE, PRODUCTION_MODE];

const logError = (title, content) => {
  console.error(chalk.bold.bgRed.white(title));
  console.error(content);
};

const ensureDistFolder = () => {
  fse.removeSync(paths.distFolder);

  fse.mkdirSync(paths.distFolder);
};

const copyPublicAssets = () => {
  fse.copySync(paths.publicFolder, paths.distFolder);
};

const createExtensionManifest = () => {
  const manifestTemplateJson = fse.readFileSync(paths.manifestTemplate);
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
  fse.writeFileSync(paths.manifest, manifestJson);
};

const getWebpackConfig = mode => {
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
};

const handleWebpackBuildResult = (err, stats) => {
  if (err) {
    logError("Webpack configuration error:", err.stack || err);
  } else if (stats.hasErrors()) {
    logError("Webpack compilation error:", stats.toString("errors-only"));
  } else {
    console.log(
      stats.toString({
        chunks: false,
        colors: true
      })
    );
  }
};

const compile = mode => {
  const webpackConfig = getWebpackConfig(mode);
  const compiler = webpack(webpackConfig);

  compiler.run(handleWebpackBuildResult);
};

const args = parseArgs(process.argv.slice(2), { string: "mode" });
const mode = args.mode && args.mode.toLowerCase();

if (mode && VALID_MODES.includes(mode)) {
  ensureDistFolder();
  copyPublicAssets();
  createExtensionManifest();
  compile(mode);
} else {
  logError(
    "Build error:",
    `Unknown build mode. Please use --mode [${VALID_MODES.join(" / ")}]`
  );
}
