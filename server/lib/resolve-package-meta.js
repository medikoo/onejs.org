// Resolve from npm registry package meta data that we need

"use strict";

const Deferred      = require("deferred")
    , memoize       = require("memoizee")
    , { resolve }   = require("path")
		, tmpdir        = require("os").tmpdir()
		, { promisify } = Deferred
    , request       = require("request")
		, { unpack }    = require("tar-pack")
		, readFile      = require("fs2/read-file")

		, requestPromise = promisify(request)
		, githubPathRe = /^git:\/\/github.com\/(([^\\]+)\/(.+)).git$/
    , HOUR = 3600000; // 1000 * 60 * 60

const resolveGithubPath = (url) => {
	if (!url) return null;
	const match = url.match(githubPathRe);

	if (!match) return null;
	return match[1];
};

module.exports = memoize((name) => requestPromise(
	`https://registry.npmjs.org/${ name }/latest`
)(async ([, npmMetaString]) => {
	const npmMeta = JSON.parse(npmMetaString)
	    , { version } = npmMeta
			, packageDir = resolve(tmpdir, `onejs-package-${ name }`)
			, deferred = new Deferred();

	const unpacker = unpack(packageDir, (err) => {
		if (err) deferred.reject(err);
		else deferred.resolve();
	});

	request(npmMeta.dist.tarball).pipe(unpacker);

	// Wait until tarball unpacks
	await deferred.promise;

	// Resolve meta and documentation
	var [documentation, meta] = await new Deferred(
		readFile(resolve(packageDir, "README.md")),
		readFile(resolve(packageDir, "package.json"))
	);

	meta = JSON.parse(meta);
	documentation = String(documentation);
	return {
		name,
		version,
		documentation,
		githubPath: resolveGithubPath(meta.repository.url)
	};
}), { promise: true, primitive: true, maxAge: HOUR });
