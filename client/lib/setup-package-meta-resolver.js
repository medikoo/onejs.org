// Initializes package meta resolver (for client-side)
// In that case we simply query the server

"use strict";

const memoize = require("memoizee/plain")
    , request = require("./request");

require("../../services/package-meta-resolver")(
	memoize((packageName) => request.get("/package-meta.json", { name: packageName }))
);
