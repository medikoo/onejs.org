// Initializaton of Single Page Application process

"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service.generated")("spa");
require("../lib/setup-package-meta-resolver");
require("../services/location-to-history");
require("../services/on-click-hash-focus-target");
const historyViewRouter = require("../services/history-to-view-router");

require("../lib/scripts");
const topHeadingHashLinker = require("../services/top-heading-hash-linker");

// Additional bindings between services:

// Reload headings after new page is loaded
historyViewRouter.on("load", topHeadingHashLinker.reload);
