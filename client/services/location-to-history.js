// Hijacks natural location changes (a[href] clicks) and submits them through History API

"use strict";

const ensureString = require("es5-ext/object/validate-stringifiable-value")
    , clickMeta    = require("html-dom-event-ext/get-current-click-meta")(document)
		, isExternal   = require("html-dom-ext/anchor/#/is-external")
    , debugService = require("debug")("service")
    , debug        = require("debug")("click-link-to-history")

    , hasExt = RegExp.prototype.test.bind(/\.[a-zA-Z0-9]+$/)
    , aHrefTpl = document.createElement("a");

require("event-emitter")(exports);

const getLocalUrl = (urlObj) => urlObj.pathname + urlObj.search + urlObj.hash;

exports.goto = (newHref) => {
	aHrefTpl.href = ensureString(newHref);
	if (aHrefTpl.href === location.href) return;
	const hasHashChanged = aHrefTpl.hash !== location.hash
	    , oldURL = location.href, newURL  = aHrefTpl.href;

	debug(`${ getLocalUrl(location) } -> ${ getLocalUrl(aHrefTpl) }`);
	history.pushState({}, "", newURL);
	window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
	if (hasHashChanged) window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL }));
	exports.emit("change", { oldURL, newURL });
};

document.addEventListener("click", (ev) => {
	var { aHref } = clickMeta;

	if (!aHref || !clickMeta.isRegular) return;
	if (isExternal.call(aHref, location.href)) return;
	if (hasExt(aHref.href)) return;

	ev.preventDefault();

	exports.goto(aHref.href);
}, false);

debugService("click link -> history");
