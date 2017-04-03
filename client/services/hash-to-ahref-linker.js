// Marks a[href] that link to hash that's in url with 'link-current-target' class

"use strict";

const not   = require("es5-ext/array/#/diff")
    , debug = require("debug")("service")

    , className = "link-current-target";

var selected = [];

const onChange = () => {
	const id = location.hash.slice(1) || null;

	const newSelected =
		document.querySelectorAll(`a[href=${ id ? JSON.stringify(`#${ id }`) : "'.'" }]`);

	const toUnmark = not.call(selected, newSelected)
			, toMark = not.call(newSelected, selected);

	toUnmark.forEach((el) => el.classList.remove(className));
	toMark.forEach((el) => el.classList.add(className));
	selected = newSelected;
};

document.addEventListener("DOMContentLoaded", onChange);
window.addEventListener("spaviewload", onChange);
window.addEventListener("hashchange", onChange);
document.addEventListener("click", () => setTimeout(onChange));
onChange();

debug("hash -> mark ahref");
