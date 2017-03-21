"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/resolve-env.generated")("spa");
require("../services/location-view-router");
