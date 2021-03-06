// HTTP server configuration

"use strict";

const { resolve }      = require("path")
    , { createServer } = require("http")
    , connect          = require("connect")
		, serveFavicon     = require("serve-favicon")
		, compression      = require("compression")
		, st               = require("st")
		, webmake          = require("webmake-middleware")
    , debug            = require("debug")("service")

    , env              = require("../../../services/env")
		, clientApp        = require("./client-app")
		, css              = require("./css")
		, rest             = require("./rest")

    , rootDir = resolve(__dirname, "../../../")
		, assetsDir = resolve(rootDir, "assets")
    , app = connect(), server = createServer(app);

// At this point we handle only GET requests
app.use((req, res, next) =>	{
	if (req.method === "GET") return next();
	res.statusCode = 404;
	return res.end("Not Found");
});

// Favicon
app.use(serveFavicon(resolve(assetsDir, "favicon.ico")));

// Turn on response GZIP compression
app.use(compression());

if (env.env === "development") {
	// Serve client JS bundle on the fly
	app.use(webmake({
		"/js/spa.js": resolve(rootDir, "client/processes/spa.js"),
		"/js/scripts.js": resolve(rootDir, "client/processes/scripts.js")
	}, { ignore: [resolve(rootDir, "node_modules/debug/src/node.js")] }));

	// Serve autoprefixed CSS on the fly
	app.use(css({ "/css/style.css": resolve(rootDir, "client/css/style.css") }));
}

// Serve system common static files
app.use(st({ path: assetsDir, passthrough: true, index: false, cache: env.env !== "development" }));

// Handle REST like queries
app.use(rest);

// Serve client program
app.use(clientApp);

// Stop server in case of crash
app.use((err, req, res, next) => {
	if (err.status) {
		next(err);
		return;
	}
	process.nextTick(() => {
		throw err;
	});
});

server.listen(env.port);
debug("http-server", `listening on ${ env.port } port`);
