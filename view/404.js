"use strict";

const { h2 } = require("../services/domjs").ns;

exports._parent = require("./error-base");

exports.main = function () {
	h2("404: Page Not Found");
};
