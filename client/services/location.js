// Location URL handling:
// - Prevents page reloads on a[href] clicks and switches the urls with History API
// - Emits events on any location change

"use strict";

const ensureString = require("es5-ext/object/validate-stringifiable-value")
    , debug        = require("debug")("service")

    , isExt = RegExp.prototype.test.bind(/\.[a-zA-Z0-9]+$/)
    , ahrefTpl = document.createElement("a")

    , MOUSE_MIDDLE_BUTTON_CODE = 2
    , MOUSE_RIGHT_BUTTON_CODE = 3;

var href;

require("event-emitter")(exports);

const isExternal = (ahref, target) => {
	if (!ahref || !ahref.href) return true;
	if (ahref.protocol && ahref.protocol !== ":" && ahref.protocol !== location.protocol) {
		return true;
	}
	if (ahref.host && ahref.host !== location.host) return true;
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

	ev.preventDefault();

	exports.goto(el.href);
}, false);

// To be used when location changed
// Can also be used to update page scroll (so eventual element referenced in hash is on top)
exports.onChange = () => {
	ahrefTpl.href = location.href;
	if (href !== location.href) {
		({ href } = location);
		exports.emit("change", ahrefTpl.pathname);
	}
	const hash = ahrefTpl.hash.slice(1);
	var target;

	if (hash) {
		target = document.getElementById(hash);
		if (target) {
			if (target.getAttribute("data-hash-auto-scroll") === "0") target = null;
		}
	}
	if (target) target.scrollIntoView({ behavior: "smooth" });
	else window.scroll(0, 0);
};

// To be used when we want to change URL manually
exports.goto = (newHref) => {
	ahrefTpl.href = ensureString(newHref);
	if (ahrefTpl.href !== location.href) history.pushState({}, "", ahrefTpl.href);
	exports.onChange();
};

exports.onChange();
debug("location");
