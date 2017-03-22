"use strict";

const { assetsRoot } = require("../services/env")

    , { footer, header, link, main } = require("../services/domjs").ns;

exports.head = function () {
	link({ href: `${ assetsRoot }style.css`, rel: "stylesheet" });
};

exports.body = function () {
	header();
	main();
	footer();
};
