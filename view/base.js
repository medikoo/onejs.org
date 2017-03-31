// Base view, ancestor of all views

"use strict";

const { assetsRoot } = require("../services/env")

    , { a, div, footer, link, main, script } = require("../services/domjs").ns;

exports.head = function () {
	link({ href: `${ assetsRoot }style.css`, rel: "stylesheet" });
	script({ src: `${ assetsRoot }scripts.js`, async: true });
};

exports.body = function () {
	main({ class: "content" });
	footer(div({ class: "content" }, a({ href: "/" }, "onejs.org")));
};
