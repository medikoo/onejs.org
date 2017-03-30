// Package documentation view

"use strict";

const { assetsRoot } = require("../services/env");

const { a, aside, h1, img, p, section } = require("../services/domjs").ns;

exports._parent = require("./package-base");
exports._match = "name";

exports.header = function () {
	h1(a({ href: `/package/${ this.name }/` }, this.name));
	p({ class: "header-version" }, `@  ${ this.version }`);
	p({ class: "header-repo-link" },
		a({ href: `https://github.com/${ this.githubPath }` },
			img({ src: `${ assetsRoot }logo-github.svg`, alt: "GitHub" })));
};

exports.main = function () {
	aside(this.toc);
	section({ class: "markdown" }, this.documentation);
};
