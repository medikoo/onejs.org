"use strict";

if (!process.env.DEBUG) {
	process.env.DEBUG = `*,-${ [
		"compression",
		"connect:dispatcher"
	].join(",-") }`;
}

const ensureNaturalNumber = require("es5-ext/object/ensure-natural-number-value")
    , isValue             = require("es5-ext/object/is-value")
    , debug               = require("debug")("service")
		, env                 = require("../../services/env")

		, DEFAULT_PORT = 3177
		, envOptions = new Set("development", "production");

var isEnvProvided = false;

try {
	Object.assign(env, require("../../env"));
	isEnvProvided = true;
} catch (e) {
	if (e.code !== "MODULE_NOT_FOUND") throw e;
	if (e.message !== "Cannot find module '../../env'") throw e;
}

if (!isValue(env.env)) {
	env.env = process.env.NODE_ENV === "production" || isEnvProvided
		? "production" : "development";
} else if (!envOptions.has(env.env)) {
	throw new Error(`Invalid ENV setting: ${ env.env }`);
}
process.env.NODE_ENV = env.env;

env.port = env.port ? ensureNaturalNumber(env.port) : DEFAULT_PORT;

env.assetsRoot = env.assetsRoot ? String(env.assetsRoot) : "/";

env.role = "server";

module.exports = function (processName) {
	env.processName = processName;
	debug(`env server:${ processName }`);
	module.exports = null;
};
