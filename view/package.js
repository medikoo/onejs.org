"use strict";

const { a, aside, h1, p, section } = require("../services/domjs").ns;

exports._parent = require("./base");
exports._match = "name";

exports.header = function () {
	h1(this.name);
	p({ class: "github" }, a({ href: `https://github.com/${ this.githubPath }` }, "GitHub"));
	p({ class: "version" }, `v${ this.version }`);
};

exports.main = function () {
	aside("Aside");
	section("Main section");
};
