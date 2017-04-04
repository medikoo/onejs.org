// Serves client SPA application HTML page

"use strict";

const { extname }         = require("path")
    , parseUrl            = require("parseurl")
    , { assetsRoot, env } = require("../../../services/env")
		, htmlRenderer        = require("../html-renderer");

module.exports = function (req, res, next) {
	const { pathname } = parseUrl(req);

	if (extname(pathname)) {
		next();
		return;
	}

	res.setHeader("X-UA-Compatible", "IE=edge,chrome=1");
	res.setHeader("Content-Type", "text/html; charset=utf-8");

	if (env === "development") {
		res.setHeader("Cache-Control", "max-age=365000000, immutable");
		res.end(`<!DOCTYPE html>
		<link href="${ assetsRoot }css/style.css" rel="stylesheet" />
		<script src="${ assetsRoot }js/spa.js"></script>`);
	} else {
		htmlRenderer(pathname).done(res.end.bind(res));
	}
};
