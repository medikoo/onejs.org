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
const RENDER_WAIT_TIMEOUT = 150;

// After new page is loaded
historyViewRouter.on("load", () => {
	// Reload headings configuration in top headings linker
	topHeadingHashLinker.reload();

	// Scroll to eventual target
	if (location.hash.slice(1)) {
	  // Timeout resolution to ensure we have full render of content
	  // (without that scrollToTarget results with misalign scrolls)
		// Done twice as in some browsers (Chrome) 0 timeout works great
		// in others (FF) longer timeout is needed to resolve neatly
		setTimeout(onClickTargetFocuser.scrollToTarget);
		setTimeout(onClickTargetFocuser.scrollToTarget, RENDER_WAIT_TIMEOUT);
	}
});

// Do not link headings right after target scroll into view
onClickTargetFocuser.on("scroll", topHeadingHashLinker.debounce);
