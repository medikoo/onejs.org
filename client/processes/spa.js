"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service.generated")("spa");
require("../services/location-view-router");
