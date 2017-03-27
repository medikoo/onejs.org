"use strict";

const Deferred      = require("deferred")
    , { resolve }   = require("path")
		, tmpdir        = require("os").tmpdir()
		, { promisify } = Deferred
    , request       = require("request")
		, { unpack }    = require("tar-pack")
		, readFile      = require("fs2/read-file")

		, requestPromise = promisify(request)
		, githubPathRe = /^git:\/\/github.com\/(([^\\]+)\/(.+)).git$/;

const resolveGithubPath = (url) => {
	if (!url) return null;
	const match = url.match(githubPathRe);

	if (!match) return null;
	return match[1];
};

module.exports = (name) => requestPromise({
	url: `https://registry.npmjs.org/${ name }`,
	headers: { Accept: "application/vnd.npm.install-v1+json" }
})(([, npmMetaString]) => {
	const npmMeta = JSON.parse(npmMetaString)
	    , version = npmMeta["dist-tags"].latest
			, packageDir = resolve(tmpdir, `onejs-package-${ name }`)
			, deferred = new Deferred()
			, unpacker = unpack(packageDir, (err) => {
				if (err) deferred.reject(err);
				else deferred.resolve();
			});

	request(npmMeta.versions[version].dist.tarball).pipe(unpacker);
	return deferred.promise(() => new Deferred(
		readFile(resolve(packageDir, "README.md")),
		readFile(resolve(packageDir, "package.json"))
	)(([documentation, meta]) => {
		meta = JSON.parse(meta);
		return {
			name,
			version,
			documentation: String(documentation),
			githubPath: resolveGithubPath(meta.repository.url)
		};
	}));
});
