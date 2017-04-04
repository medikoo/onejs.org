// Runs all necessary setup scripts

"use strict";

const deferred         = require("deferred")
    , resolveClientEnv = require("./generate-client-env-resolver")
    , generateCss      = require("./generate-css");

module.exports = () => deferred(
	resolveClientEnv(),
	generateCss()
);

if (require.main === module) module.exports().done();
