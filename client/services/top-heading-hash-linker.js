"use strict";

const ensureObject = require("es5-ext/object/valid-object")
    , ensureString = require("es5-ext/object/validate-stringifiable-value")
    , ee           = require("event-emitter")
		, memoize      = require("memoizee")
    , debounce     = require("timers-ext/once")
	  , throttle     = require("timers-ext/throttle")
    , debugService = require("debug")("service")
    , debug        = require("debug")("top-heading-to-hash")

    , MAX_HEADING = 6, UPDATE_FREQ = 100, ACCEPTED_MARGIN = 20, WAIT_SPAN = 700;

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
		if (heading.getBoundingClientRect().top > ACCEPTED_MARGIN) return true;
		current = heading;
		return false;
	});
	const id = (current && current.id) || null
	    , hash = location.hash.slice(1) || null;

	if (id === hash) return;
	const oldURL = location.href
	    , newURL = location.href.slice(0, -location.hash.length) + (id ? `#${ id }` : "");

	debug(`${ hash || "<null>" } -> ${ id || "<null>" }`);
	history.pushState({}, "", newURL);
	window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
	window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL }));
	exports.emit("link", { oldURL, newURL });
};

module.exports = (conf) => {
	module.exports = exports = ee({ reload });
	contextSelector = ensureString(ensureObject(conf).contextSelector);
	document.addEventListener("DOMContentLoaded", reload);

	var isActive = true;
	const throttledUpdateHash = throttle(updateHash, UPDATE_FREQ)
	    , debounceScroll = debounce(() => isActive = true, WAIT_SPAN);

	exports.debounce = () => {
		isActive = false;
		debounceScroll();
	};
	document.addEventListener("click", exports.debounce, true);
	window.addEventListener("scroll", () => {
		// Do not react in debounce period
		if (!isActive) return;
		// Timeout as in Safari it gets in before actual click, after which we want to debounce
		setTimeout(throttledUpdateHash);
	});
	reload();
	debugService("top-heading -> hash");
};
