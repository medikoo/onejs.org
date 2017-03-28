// Initializaton of Single Page Application process

"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service.generated")("spa");
require("../lib/setup-package-meta-resolver");
require("../services/location-view-router");
