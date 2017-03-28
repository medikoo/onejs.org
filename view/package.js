// Package documentation view

"use strict";

const MarkdownIt     = require("markdown-it")
    , { assetsRoot } = require("../services/env")

		, md = new MarkdownIt();

const { a, aside, h1, img, p, section } = require("../services/domjs").ns;

exports._parent = require("./base");
exports._match = "name";

exports.header = function () {
	h1(this.name);
	p({ class: "header-version" }, `@  ${ this.version }`);
	p({ class: "header-repo-link" },
		a({ href: `https://github.com/${ this.githubPath }` },
			img({ src: `${ assetsRoot }logo-github.svg`, alt: "GitHub" })));
};

exports.main = function () {
	aside("Aside");
	section({ class: "markdown" }).innerHTML = md.render(this.documentation);
};
