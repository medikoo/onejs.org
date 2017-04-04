// Base view, ancestor of all views

"use strict";

const { assetsRoot, role } = require("../services/env")

    , { a, div, footer, link, main, script } = require("../services/domjs").ns;

exports.head = function () {
	link({ href: `${ assetsRoot }css/style.css`, rel: "stylesheet" });
	if (role === "server") script({ src: `${ assetsRoot }js/scripts.js`, async: true });
};

exports.body = function () {
	main({ class: "content" });
	footer(div({ class: "content" }, a({ href: "/" }, "onejs.org")));
};
