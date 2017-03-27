"use strict";

const { a, h1, p } = require("../services/domjs").ns;

exports._parent = require("./base");

exports.main = {
	class: { cover: true },
	content () {
		h1("onejs.org");
		p("A very basic, ", a({ href: "https://www.npmjs.com/" }, "npm"),
			" packages documentation catalogue");
		p("If you'd like to see your package here contact me at ",
			a({ href: "mailto:medikoo@onejs.org" }, "medikoo@onejs.org"));
	}
};
