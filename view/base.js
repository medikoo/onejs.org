"use strict";

const { assetsRoot } = require("../services/env")

    , { a, div, footer, link, main } = require("../services/domjs").ns;

exports.head = function () {
	link({ href: `${ assetsRoot }style.css`, rel: "stylesheet" });
};

exports.body = function () {
	main();
	footer(div({ class: "content" }, a({ href: "/" }, "onejs.org")));
};
