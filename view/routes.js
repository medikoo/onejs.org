// View <-> url mappings
// Here we indicate at which urls which views are shown

"use strict";

const isPackageNameValid      = require("../lib/is-package-name-valid")
    , resolvePackageMeta      = require("../services/package-meta-resolver")
		, markdownToDom           = require("../services/markdown-to-dom")
		, packageView             = require("./package")
		, packageNotSupportedView = require("./package-not-supported")
		, serverErrorView         = require("./500");

module.exports = {
	"/": require("./home"),
	"package/[a-zA-Z0-9][a-zA-Z0-9_.-]*": {
		match (name) {
			if (!isPackageNameValid(name)) return false;
			this.name = name;
			return resolvePackageMeta(name)(
				(data) => Object.assign(this, data, markdownToDom(data.documentation)),
				(error) => this.serverError = error
			);
		},
		resolveView () {
			if (this.serverError) return serverErrorView;
			if (this.error) return packageNotSupportedView;
			return packageView;
		}
	}
};
