// Runs all necessary setup scripts

"use strict";

const resolveClientEnv = require("./generate-client-env-resolver");

module.exports = () => resolveClientEnv();

if (require.main === module) module.exports().done();
