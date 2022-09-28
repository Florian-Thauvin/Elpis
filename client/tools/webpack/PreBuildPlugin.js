/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const Logger = require("./Logger");
const logger = Logger.getInstance();
logger.setLevel("WARN");
logger.setLocation("pre-build-plugin.log");

class PreBuildPlugin {
  apply(compiler) {
    compiler.hooks.environment.tap("PreBuildPlugin", () => {
      this.initGeneratedDirectory();
    });
    compiler.hooks.beforeCompile.tap(
      "PreBuildPlugin",
      (
        stats /* stats is passed as an argument when done hook is tapped.  */
      ) => {
        console.log("BEFORE COMPILE STATS DATAS", ...Object.keys(stats));
        this.initGeneratedDirectory();
      }
    );
  }
  initGeneratedDirectory() {
    if (!fs.existsSync(path.resolve(__dirname, "../../src/generated"))) {
      fs.mkdirSync(path.resolve(__dirname, "../../src/generated"));
    }
  }
}

module.exports = PreBuildPlugin;
