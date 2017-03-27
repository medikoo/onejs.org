"use strict";

const request = require("./request");

require("../../services/package-meta-resolver")(
	(packageName) => request.get("/package-meta.json", { name: packageName })
);
