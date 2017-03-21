"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/resolve-env")("master");
require("../services/http-server");
