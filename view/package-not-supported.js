// View dedicated for not supported packages

"use strict";

const { a, h2, p } = require("../services/domjs").ns;

exports._parent = require("./error-base");
exports._match = "name";

exports.main = function () {
	h2(`Package "${ this.name }" is not supported at this point`);
	p("If you'd like to see this package here contact me at ",
		a({ href: "mailto:medikoo@onejs.org" }, "medikoo@onejs.org"));
};
