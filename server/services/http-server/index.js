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

    , rootDir = resolve(__dirname, "../../../")
		, assetsDir = resolve(rootDir, "assets")
    , app = connect(), server = createServer(app);

// Favicon
app.use(serveFavicon(resolve(assetsDir, "favicon.ico")));

// Turn on response GZIP compression
app.use(compression());

if (env.env === "development") {
	// Serve client JS bundle on the fly
	app.use(webmake({ "/main.js": resolve(rootDir, "client/processes/spa.js") },
	{ ignore: [resolve(rootDir, "node_modules/debug/src/node.js")] }));
}

// Serve system common static files
app.use(st({ path: assetsDir, passthrough: true, index: false, cache: env.env !== "development" }));

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
