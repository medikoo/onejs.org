// Base for error views

"use strict";

const { h1 } = require("../services/domjs").ns;

exports._parent = require("./package-base");

exports.header = function () {
	h1("onejs.org");
};
