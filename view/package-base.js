// Base for fixed-header/main/footer views

"use strict";

const { header, div } = require("../services/domjs").ns;

exports._parent = require("./base");

exports.body = {
	class: { package: true },
	prepend () {
		header(div({ class: "content", id: "header" }));
	}
};
