// Ensure proper browser detection in debug component

"use strict";

// 'debug' workaround
window.process = { type: "renderer", env: { DEBUG: "*" } };
require("debug");
delete window.process;
