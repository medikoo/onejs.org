"use strict";

const builtins = require("builtins")

    , rejected = new Set(builtins.concat("node_modules", "favicon.ico"));

module.exports = (name) => !rejected.has(name);
