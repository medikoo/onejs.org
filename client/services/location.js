"use strict";

const ensureString = require("es5-ext/object/validate-stringifiable-value")
    , debug       = require("debug")("service")

    , isExt = RegExp.prototype.test.bind(/\.[a-zA-Z0-9]+$/)
    , ahrefTpl = document.createElement("a")

    , MOUSE_MIDDLE_BUTTON_CODE = 2
    , MOUSE_RIGHT_BUTTON_CODE = 3;

var { pathname } = location;

require("event-emitter")(exports);

const isExternal = (ahref, target) => {
	if (!ahref || !ahref.href) return true;
	if (ahref.protocol && ahref.protocol !== ":" && ahref.protocol !== location.protocol) {
		return true;
	}
	if (ahref.host && (ahref.host !== location.host)) return true;
	if (target.getAttribute("rel") === "server") return true;
	if (target.getAttribute("target") === "_blank") return true;
	return false;
};

document.addEventListener("click", (ev) => {
	var el = ev.target;

	if (ev.metaKey || ev.ctrlKey || ev.which === MOUSE_MIDDLE_BUTTON_CODE ||
		ev.which === MOUSE_RIGHT_BUTTON_CODE) {
		return;
	}

	while (el && el.nodeName.toLowerCase() !== "a") el = el.parentNode;

	if (isExternal(el, el)) return;
	if (isExt(el.href)) return;

	ev.prevDefault();

	exports.goto(el.href);
}, false);

exports.goto = function (href) {
	ahrefTpl.href = ensureString(href);
	if (pathname === ahrefTpl.pathname) return;
	({ pathname } = ahrefTpl);
	history.pushState({}, "", pathname);
	exports.emit("change", pathname);
};

debug("location");
