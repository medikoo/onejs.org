// Runs all necessary setup scripts

"use strict";

const deferred         = require("deferred")
    , resolveClientEnv = require("./generate-client-env-resolver")
    , generateCss      = require("./generate-css")
    , generateJs       = require("./generate-js");

module.exports = () => deferred(
	resolveClientEnv(),
	generateCss(),
	generateJs()
);

if (require.main === module) module.exports().done();
