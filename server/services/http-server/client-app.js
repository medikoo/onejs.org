// Serves client SPA application HTML page

"use strict";

const { extname }    = require("path")
    , parseUrl       = require("parseurl")
    , { assetsRoot } = require("../../../services/env");

module.exports = function (req, res, next) {
	if (extname(parseUrl(req).pathname)) {
		next();
		return;
	}

	res.setHeader("X-UA-Compatible", "IE=edge,chrome=1");
	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.setHeader("Cache-Control", "max-age=365000000, immutable");
	res.end(`<!DOCTYPE html>
	<link href="${ assetsRoot }style.css" rel="stylesheet" />
	<script src="${ assetsRoot }main.js"></script>`);
};
