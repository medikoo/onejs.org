// Hijacks natural location changes (a[href] clicks) and submits them through History API

"use strict";

const ensureString   = require("es5-ext/object/validate-stringifiable-value")
    , isRegularClick = require("html-dom-event-ext/detect-regular-click")(document)
		, isExternal     = require("html-dom-ext/anchor/#/is-external")
    , debug          = require("debug")("service")

    , isExt = RegExp.prototype.test.bind(/\.[a-zA-Z0-9]+$/)
    , ahrefTpl = document.createElement("a");

exports.goto = (newHref) => {
	ahrefTpl.href = ensureString(newHref);
	if (ahrefTpl.href === location.href) return;
	const hasHashChanged = ahrefTpl.hash !== location.hash
	    , oldURL = location.href, newURL  = ahrefTpl.href;

	history.pushState({}, "", newURL);
	window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
	if (hasHashChanged) window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL }));
};

document.addEventListener("click", (ev) => {
	var el = ev.target;

	if (!isRegularClick()) return;

	while (el && el.nodeName.toLowerCase() !== "a") el = el.parentNode;
	if (!el) return;

	if (isExternal.call(el, location.href)) return;
	if (isExt(el.href)) return;

	ev.preventDefault();

	exports.goto(el.href);
}, false);

debug("click link -> history");
