/* global document */
/* eslint no-shadow: ["error", { "allow": ["document"] }] */

// Exposes process main document object
// On client side it simply refers to global document

"use strict";

const isDocument = require("dom-ext/html-document/is-html-document")
    , debug      = require("debug")("service");

if (typeof document === "object" && isDocument(document)) {
	module.exports = document;
} else {
	const nextTick       = require("next-tick")
	    , ensureDocument = require("dom-ext/html-document/valid-html-document");

	module.exports = (document) => module.exports = ensureDocument(document);

	// Throw if valid document not injected immediately after initial require
	nextTick(() => ensureDocument(module.exports));
}

debug("document");
