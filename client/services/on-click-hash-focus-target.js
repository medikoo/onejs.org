// Location URL handling:
// - Prevents page reloads on a[href] clicks and switches the urls with History API
// - Emits events on any location change

"use strict";

const isRegularClick = require("html-dom-event-ext/detect-regular-click")(document)
    , serviceDebug   = require("debug")("service")
    , debug          = require("debug")("focus-target");

exports.scrollToTarget = () => {
	const hash = location.hash.slice(1) || null;
	var target;

	if (hash) {
		target = document.getElementById(hash);
		if (!target) return false;
		if (target) {
			if (target.getAttribute("data-hash-auto-scroll") === "0") return false;
		}
	}
	debug(target ? hash : "<top>");
	if (target) target.scrollIntoView({ behavior: "smooth" });
	else window.scroll(0, 0);
	return true;
};

window.addEventListener("popstate", (ev) => {
	if (ev.isTrusted || isRegularClick()) setTimeout(exports.scrollToTarget, 0);
}, false);

// Custom event, which maybe invoked by view rendering engine
window.addEventListener("pageload", () => {
	if (location.hash.slice(1)) setTimeout(exports.scrollToTarget);
}, false);

serviceDebug("click hash -> scroll target");
