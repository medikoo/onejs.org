// Bind view router to url address
// This module ensures views are automatically routed to corresponding urls in address bar

"use strict";

const debugService = require("debug")("service")
    , debug        = require("debug")("view-router")
    , viewRouter   = require("../../services/view-router");

require("event-emitter")(exports);

var currentPathname;

exports.update = () => {
	const newPathname = location.pathname;

	if (newPathname === currentPathname) return;
	currentPathname = newPathname;
	debug(`-> ${ newPathname }`);
	viewRouter.route(newPathname).done(
		() => exports.emit("load", { pathname: newPathname }),
		(err) => {
			if (err.code !== "OUTDATED_ROUTE_CALL") throw err;
		}
	);
};

exports.update();
window.addEventListener("popstate", exports.update, false);

debugService("history -> view-router");
