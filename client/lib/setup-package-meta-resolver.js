// Initializes package meta resolver (for client-side)
// In that case we simply query the server

"use strict";

const request = require("./request");

require("../../services/package-meta-resolver")(
	(packageName) => request.get("/package-meta.json", { name: packageName })
);
