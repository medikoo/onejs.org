"use strict";

const debug           = require("debug")("service")
    , locationService = require("./location")
    , viewRouter      = require("../../services/view-router");

const onNewPathname = (pathname) => {
	if (!pathname.endsWith("/")) {
		locationService.goto(`${ pathname }/"`);
		return;
	}
	viewRouter.route(pathname);
};

locationService.on("change", onNewPathname);
onNewPathname(location.pathname);
debug("location-view-router");
