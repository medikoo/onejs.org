// Initializes server master process

"use strict";

Error.stackTraceLimit = Infinity;

// Initialize process services
require("../lib/setup-env-service")("master");
require("../lib/setup-package-meta-resolver");
require("../lib/setup-document");
require("../services/http-server");
