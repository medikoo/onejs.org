"use strict";

const ensureObject = require("es5-ext/object/valid-object")
    , ensureString = require("es5-ext/object/validate-stringifiable-value")
		, memoize      = require("memoizee")
    , throttle     = require("timers-ext/throttle")
    , debug        = require("debug")("service")

    , MAX_HEADING = 6, UPDATE_FREQ = 100;

var contextSelector, headings = [];

const reload = () => {
	const selector = Array.from(Array(MAX_HEADING),
		(ignore, index) => `${ contextSelector } h${ index + 1 }[id]`).join(", ");

	const getTop = memoize((element) => element.getBoundingClientRect().top);

	headings = Array.from(document.querySelectorAll(selector))
		.sort((el1, el2) => getTop(el1) - getTop(el2));
};

const updateHash = () => {
	var current;

	headings.some((heading) => {
		if (heading.getBoundingClientRect().top > 0) return true;
		current = heading;
		return false;
	});
	const id = (current && current.id) || null
	    , hash = location.hash.slice(1) || null;

	if (id === hash) return;
	history.pushState({}, "", location.href.slice(0, -location.hash.length) + id ? `#${ id }` : "");
	window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
};

module.exports = (conf) => {
	module.exports = null;
	contextSelector = ensureString(ensureObject(conf).contextSelector);
	document.addEventListener("DOMContentLoaded", reload);
	window.addEventListener("spaviewload", reload);
	reload();
	window.addEventListener("scroll", throttle(updateHash, UPDATE_FREQ));
	updateHash();
	debug("top-heading -> hash");
};
