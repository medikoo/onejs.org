// 500 page, shown when we're unable to retrieve package meta data

"use strict";

const { h2 } = require("../services/domjs").ns;

exports._parent = require("./error-base");

exports.main = function () {
	h2("500: Server error, try again later");
};
