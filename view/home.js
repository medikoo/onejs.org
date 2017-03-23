"use strict";

const { h1, main } = require("../services/domjs").ns;

exports._parent = require("./base");

exports.body = function () {
	main({ class: "cover" }, h1("onejs.org"));
};
