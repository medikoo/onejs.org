"use strict";

const { a, aside, div, footer, h1, header, main, p, section } = require("../services/domjs").ns;

exports._parent = require("./base");
exports._match = "name";

exports.body = function () {
	header(div({ class: "content" },
		h1(this.name),
		p({ class: "github" }, a({ href: `https://github.com/${ this.githubPath }` }, "GitHub")),
		p({ class: "version" }, `v${ this.version }`)));

	main({ class: "content" },
		aside("Aside"),
		section("Main section")
	);

	footer(div({ class: "content" }, a({ href: "/" }, "onejs.org")));
};
