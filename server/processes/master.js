"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service")("master");
require("../lib/setup-package-meta-resolver");
require("../services/http-server");
