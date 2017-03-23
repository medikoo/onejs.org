"use strict";

const { assetsRoot } = require("../services/env")

    , { link } = require("../services/domjs").ns;

exports.head = function () {
	link({ href: `${ assetsRoot }style.css`, rel: "stylesheet" });
};
