"use strict";

var readFile     = require("fs2/read-file")
  , autoprefixer = require("./css-autoprefix-code");

module.exports = (path) => readFile(path)(autoprefixer);
