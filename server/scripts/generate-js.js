// Generates env service resolver dedicated for client side

"use strict";

const deferred     = require("deferred")
    , { resolve }  = require("path")
    , writeFile    = require("fs2/write-file")
		, debug        = require("debug")("setup")
    , webmake      = require("webmake")
    , minify       = require("../lib/minify-js")

    , rootPath = resolve(__dirname, "../../")
		, sourcePath = resolve(rootPath, "client/processes")
    , targetPath = resolve(rootPath, "assets/js");

const generate = (name) => webmake(
	resolve(sourcePath, name),
	{ ignore: [resolve(rootPath, "node_modules/debug/src/node.js")] }
)((content) => writeFile(resolve(targetPath, name), minify(content), { intermediate: true }));

module.exports = () => {
	debug("generate-js");

	return deferred(generate("scripts.js"), generate("spa.js"));
};

if (require.main === module) module.exports().done();
