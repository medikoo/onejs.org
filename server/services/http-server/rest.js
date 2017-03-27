/* eslint max-statements: "off" */

// REST like queries handler, at this point in very raw form
// TODO: Back with some dedicated route handler, either express or some controller-router extension

"use strict";

const parseQuery         = require("querystring").parse
    , parseUrl           = require("parseurl")
		, supportedPackages  = require("../../../lib/supported-packages")
		, resolvePackageMeta = require("../../lib/resolve-package-meta")

		, HTTP_STATUS_OK = 200
    , HTTP_STATUS_BAD_REQUEST = 400;

module.exports = (req, res, next) => {
	const url = parseUrl(req)
	    , { pathname, search } = url;

	if (pathname === "/package-meta.json") {
		const query = parseQuery(search.slice(1));

		if (!query.name) {
			res.statusCode = HTTP_STATUS_BAD_REQUEST;
			res.end("Bad Request");
			return;
		}
		if (!supportedPackages.has(query.name)) {
			res.writeHead(HTTP_STATUS_OK, { "Content-Type": "application/json; charset=utf-8" });
			res.end(JSON.stringify({ error: "Package not supported" }));
			return;
		}
		resolvePackageMeta(query.name).done((meta) => {
			res.writeHead(HTTP_STATUS_OK, { "Content-Type": "application/json; charset=utf-8" });
			res.end(JSON.stringify(meta));
		});
		return;
	}
	next();
};
