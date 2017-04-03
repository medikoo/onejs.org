// Bind view router to url address
// This module ensures views are automatically routed to corresponding urls in address bar

"use strict";

const debug      = require("debug")("service")
    , viewRouter = require("../../services/view-router");

var currentPathname;

exports.update = () => {
	const newPathname = location.pathname;

	if (newPathname === currentPathname) return;
	currentPathname = newPathname;
	viewRouter.route(currentPathname).done(
		() => window.dispatchEvent(new Event("pageload")),
		(err) => {
			if (err.code !== "OUTDATED_ROUTE_CALL") throw err;
		}
	);
};

exports.update();
window.addEventListener("popstate", exports.update, false);

debug("history -> view-router");
