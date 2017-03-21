"use strict";

const { p } = require("../services/domjs").ns;

exports._parent = require("./base");

exports.main = function () {
	p("Page Not Found");
};
