"use strict";

var autoprefixer = require("autoprefixer");

module.exports = (code) => autoprefixer.process(String(code)).css;
