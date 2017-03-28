// View router service, exposes routable view tree, which is bound to process main document

"use strict";

const deferred       = require("deferred")
    , debug          = require("debug")("service")
    , DomjsSiteTree  = require("domjs-site-tree")
    , SiteTreeRouter = require("site-tree-router")
    , domjs          = require("./domjs")
    , routes         = require("../view/routes")
    , notFoundView   = require("../view/404")

    , siteTree = new DomjsSiteTree(domjs);

module.exports = new SiteTreeRouter(routes, siteTree,
	{ notFound: notFoundView, promiseResultImplementation: deferred });
debug("view-router");
