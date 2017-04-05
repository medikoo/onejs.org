// Resolves HTML for given pathname

"use strict";

const { gate }            = require("deferred")
    , memoize             = require("memoizee")
    , debugService        = require("debug")("service")
    , { documentElement } = require("../../services/document")
    , viewRouter          = require("../../services/view-router");

module.exports = gate(memoize(
	(pathname) => viewRouter.route(pathname)(() => `<!DOCTYPE html>${ documentElement.innerHTML }`),
	{ promise: true, primitive: true }
), 1);

debugService("html-renderer");
