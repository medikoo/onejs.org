/* eslint no-eval: "off", no-shadow: ["error", { "allow": ["assetsRoot"] }],
          prefer-template: "off" */

"use strict";

const document             = require("../services/document")
    , { assetsRoot, role } = require("../services/env")

    , { footer, h1, header, link, main, script } = require("../services/domjs").ns;

exports.head = function () {
	if (role === "server") {
		script((assetsRoot) => {
			if (typeof Symbol === "undefined") return;
			try {
				eval("var foo = (x)=>x+1");
			} catch (e) {
				return;
			}
			if (document.cookie.indexOf("legacy=1") !== -1) return;
			document.write("<script defer crossorigin src=\"" + assetsRoot + "main.js\"></script>");
		}, assetsRoot);
	}

	link({ href: `${ assetsRoot }style.css`, rel: "stylesheet" });
};

exports.body = function () {
	header(h1("onejs.org"));
	main();
	footer();
};
