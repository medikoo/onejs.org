// Marks a[href] that link to hash that's in url with 'link-current-target' class

"use strict";

const not          = require("es5-ext/array/#/diff")
    , debugService = require("debug")("service")
    , debug        = require("debug")("ahref-hash-mark")

    , className = "link-current-target";

var selected = [];

const onChange = () => {
	const id = location.hash.slice(1) || null;

	const newSelected =
		document.querySelectorAll(`a[href=${ id ? JSON.stringify(`#${ id }`) : "'.'" }]`);

	const toUnmark = not.call(selected, newSelected)
			, toMark = not.call(newSelected, selected);

	if (!toUnmark.length && !toMark.length) return;

	debug(id);
	toUnmark.forEach((el) => el.classList.remove(className));
	toMark.forEach((el) => el.classList.add(className));
	selected = newSelected;
};

document.addEventListener("DOMContentLoaded", onChange);
window.addEventListener("pageload", onChange);
window.addEventListener("hashchange", onChange);
onChange();

debugService("hash -> ahref mark");
