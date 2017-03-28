// Simple XMLHttpRequest -> promise handler

"use strict";

const deferred  = require("deferred/deferred")
    , stringify = require("querystring2/stringify")
    , urlFormat = require("url3/format")
    , urlParse  = require("url3/parse")

    , isFormDataImplemented = typeof FormData !== "undefined"
		, HTTP_STATUS_FIRST_SUCCESS = 200, HTTP_STATUS_FIRST_NON_SUCCESS = 300;

var lastPromise = null;

const resolveResult = (xhr) => {
	var type = xhr.getResponseHeader("Content-Type");

	if (type) [type] = type.split(";");

	if (type === "application/json") return JSON.parse(xhr.responseText);
	return xhr.responseText;
};

const send = (method, url, data) => {
	var xhr = new XMLHttpRequest(), def = deferred();

	xhr.open(method, url, true);
	xhr.onload = () => {
		var result, error;

		try {
			result = resolveResult(xhr);
		} catch (e) {
			def.reject(e);
			return;
		}
		if (xhr.status < HTTP_STATUS_FIRST_SUCCESS || xhr.status >= HTTP_STATUS_FIRST_NON_SUCCESS) {
			if (result.message) error = Object.assign(new Error(result.message), result);
			else error = new Error(result);
			def.reject(error);
			return;
		}
		def.resolve(result);
	};
	xhr.onerror = () => def.reject(new Error("Error occured"));

	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	if (method === "POST" && (!isFormDataImplemented || !(data instanceof FormData))) {
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	if (data) xhr.send(isFormDataImplemented && data instanceof FormData ? data : stringify(data));
	else xhr.send();

	return def.promise;
};

exports.post = function (url, data) {
	var cb = () => lastPromise = send("POST", url, data);

	return deferred(lastPromise)(cb, cb);
};

exports.get = function (url, data) {
	var urlObj;

	if (data) {
		urlObj = urlParse(url, true);
		Object.assign(urlObj.query, data);
		url = urlFormat(urlObj);
	}
	return send("GET", url);
};

exports.send = send;
