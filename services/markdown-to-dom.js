/* eslint id-length: ["error", { "exceptions": ["a", "p"] } ] */

"use strict";

const getToId        = require("dom-ext/html-document/get-to-id-string")
		, extendFragment = require("dom-ext/document-fragment/#/extend")
		, debug          = require("debug")("service")
    , MarkdownIt     = require("markdown-it")
    , hljs           = require("highlight.js")
		, document       = require("./document")

		, { a, div, li, p, ul } = require("./domjs").ns
		, tmpEl = div()
		, removeElement = Function.prototype.call.bind(tmpEl.remove);

const md = new MarkdownIt({
	highlight (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (ignore) {}
		}

		// Use external default escaping
		return "";
	}
});

module.exports = (markdown) => {
	const toId = getToId();

	tmpEl.innerHTML = md.render(markdown);

	// Discard h1 (assumption: there's only one h1 and it purely mentions package name)
	for (const el of Array.from(tmpEl.querySelectorAll("h1"))) removeElement(el);

	// Build table of contents (assumption: h2 is only one main subheading of documentation)
	var currentLevel = 3, list = ul({ class: "toc" });

	const toc = list, overviewHeading = tmpEl.querySelector("h2");

	if (overviewHeading) list.append(li(p(a({ href: "." }, "Overview"))));

	for (const heading of Array.from(tmpEl.querySelectorAll("h3, h4, h5, h6"))) {
		const level = Number(heading.nodeName[1])
		    , headingText = heading.innerText || heading.textContent;

		if (!heading.id) heading.id = toId(headingText);

		while (level < currentLevel) {
			list = list.parentNode.parentNode;
			--currentLevel;
		}
		while (level > currentLevel) {
			if (!list.lastChild) list.append(li());
			list = list.lastChild.appendChild(ul());
			++currentLevel;
		}
		list.append(li(p(a({ href: `#${ heading.id }` }, headingText))));
	}
	return {
		toc,
		documentation: extendFragment.call(document.createDocumentFragment(), tmpEl.childNodes)
	};
};

debug("markdown -> dom");
