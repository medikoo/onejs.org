// Package meta resolver services
// It is setup individually in client and server environments via:
// /client/lib/setup-package-meta-resolver.js and /server/lib/setup-package-meta-resolver.js

"use strict";

const debug = require("debug")("service");

module.exports = (resolver) => {
	module.exports = resolver;
	debug("package-meta-resolver");
};
