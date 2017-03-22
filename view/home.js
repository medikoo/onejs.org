"use strict";

const { h1 } = require("../services/domjs").ns;

exports._parent = require("./base");

exports.main = function () {
	h1("onejs.org");
};
