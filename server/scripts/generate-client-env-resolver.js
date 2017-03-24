"use strict";

require("../lib/setup-env-service");

const { resolve } = require("path")
    , writeFile   = require("fs2/write-file")
		, debug       = require("debug")("setup")
    , env         = require("../../services/env")

    , rootPath = resolve(__dirname, "../../")
		, targetPath = resolve(rootPath, "client/lib/setup-env-service.generated.js");

const content = `// DO NOT MODIFY!
// This file was autogenerated by /server/scripts/generate-client-env-resolver.js

"use strict";

// 'debug' workaround
window.process = { type: "renderer", env: { DEBUG: "*" } };
require("debug");
delete window.process;

const debug = require("debug")("service");

const env = Object.assign(require("../../services/env"), ${ JSON.stringify({
	assetsRoot: env.assetsRoot,
	role: "client"
}, null, "\t") });

module.exports = function (processName) {
	env.processName = processName;
	debug(\`env client:\${ processName }\`);
	module.exports = null;
};
`;

module.exports = () => {
	debug("generate-client-env-resolver");
	return writeFile(targetPath, content, { intermediate: true });
};

if (require.main === module) module.exports().done();
