"use strict";

module.exports = {
	"/": require("./home"),
	"package/test": {
		decorateContext () {
			this.name = "test";
			this.version = "0.0.0";
			this.githubPath = "foo/bar";
		},
		view: require("./package")
	}
};
