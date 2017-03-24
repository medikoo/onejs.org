"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service")("master");
require("../services/http-server");
