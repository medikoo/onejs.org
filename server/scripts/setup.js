// Runs all necessary setup scripts

"use strict";

require("../lib/setup-env-service");

const deferred         = require("deferred")
    , resolveClientEnv = require("./generate-client-env-resolver")
    , generateCss      = require("./generate-css")
    , generateJs       = require("./generate-js")
    , { env }          = require("../../services/env");

module.exports = () => deferred(
	resolveClientEnv(),
	(env === "production") && generateCss(),
	(env === "production") && generateJs()
);

if (require.main === module) module.exports().done();
