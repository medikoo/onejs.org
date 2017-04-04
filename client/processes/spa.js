// Initializaton of Single Page Application process

"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service.generated")("spa");
require("../lib/setup-package-meta-resolver");
require("../services/location-to-history");
const onClickTargetFocuser = require("../services/on-click-hash-focus-target");
const historyViewRouter = require("../services/history-to-view-router");

require("../lib/scripts");
const topHeadingHashLinker = require("../services/top-heading-hash-linker");

// Additional bindings between services:

// After new page is loaded
historyViewRouter.on("load", () => {
	// Reload headings configuration in top headings linker
	topHeadingHashLinker.reload();

	// Scroll to eventual target
	// Timeout resolution to ensure we have full render of content
	// (without that scrollToTarget results with misalign scrolls)
	if (location.hash.slice(1)) setTimeout(onClickTargetFocuser.scrollToTarget);
});
