"use strict";

const { processString } = require("uglifycss");

module.exports = (code) => processString(code);
