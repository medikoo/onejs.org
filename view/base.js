// Base view, ancestor of all views

"use strict";

const { assetsRoot } = require("../services/env")

    , { a, header, div, footer, link, main } = require("../services/domjs").ns;

exports.head = function () {
	link({ href: `${ assetsRoot }style.css`, rel: "stylesheet" });
};

exports.body = function () {
	header(div({ class: "content", id: "header" }));
	main({ class: "content" });
	footer(div({ class: "content" }, a({ href: "/" }, "onejs.org")));
};
