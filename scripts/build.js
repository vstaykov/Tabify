/* eslint-disable no-console */
const parseArgs = require("minimist");
const webpack = require("webpack");
const webpackDevConfig = require("./config/webpack/webpack.config.dev");
const webpackProductionConfig = require("./config/webpack/webpack.config.prod");

const DEV_MODE = "dev";
const PRODUCTION_MODE = "production";
const VALID_MODES = [DEV_MODE, PRODUCTION_MODE];

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

const args = parseArgs(process.argv.slice(2), { string: "mode" });
const mode = args.mode && args.mode.toLowerCase();

if (mode && VALID_MODES.includes(mode)) {
  const webpackConfig = getWebpackConfig(mode);
  const compiler = webpack(webpackConfig);

  compiler.run(handleWebpackBuildResult);
} else {
  console.error(
    `Unknown build mode. Please use --mode [${VALID_MODES.join(" / ")}]`
  );
}
