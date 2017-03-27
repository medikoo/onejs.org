// Implementation to be provided per client and server environment
// For client decided in /client/lib/setup-package-meta-resolver.js

"use strict";

const debug = require("debug")("service");

module.exports = (resolver) => {
	module.exports = resolver;
	debug("package-meta-resolver");
};
