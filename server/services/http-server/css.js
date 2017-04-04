"use strict";

const parseUrl     = require("parseurl")
    , autoprefixer = require("../../lib/css-autoprefix-file")

    , HTTP_STATUS_OK = 200;

module.exports = function (config) {
	return (req, res, next) => {
		const { pathname } = parseUrl(req);

		if (!config[pathname]) {
			next();
			return;
		}

		autoprefixer(config[pathname]).done((code) => {
			res.writeHead(HTTP_STATUS_OK, {
				"Content-Type": "text/css; charset=utf-8",
				"Cache-Control": "no-cache"
			});
			res.end(code);
		});
	};
};
