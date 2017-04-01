// Bind view router to url address
// This module ensures views are automatically routed to corresponding urls in address bar

"use strict";

const debug           = require("debug")("service")
    , locationService = require("./location")
    , viewRouter      = require("../../services/view-router");

const onNewPathname = (pathname) => {
	if (!pathname.endsWith("/")) {
		locationService.goto(`${ pathname }/`);
		return;
	}
	viewRouter.route(pathname).done(() => {
		const loadEvent = new Event("spaviewload");

		locationService.onChange();
		window.dispatchEvent(loadEvent);
	}, (err) => {
		if (err.code !== "OUTDATED_ROUTE_CALL") throw err;
	});
};

locationService.on("change", onNewPathname);
onNewPathname(location.pathname);
debug("location-view-router");
