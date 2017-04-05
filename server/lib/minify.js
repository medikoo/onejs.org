"use strict";

const uglifyJs = require("uglify-js")

    , { minify } = uglifyJs;

// Prevent console noise
delete uglifyJs.AST_Node.warn_function;

module.exports = (code) => minify(code, { fromString: true }).code;
