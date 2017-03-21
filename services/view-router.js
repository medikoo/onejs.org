"use strict";

const debug          = require("debug")("service")
    , DomjsSiteTree  = require("domjs-site-tree")
    , SiteTreeRouter = require("site-tree-router")
    , domjs          = require("./domjs")
    , routes         = require("../view/routes")
    , notFoundView   = require("../view/404")

    , siteTree = new DomjsSiteTree(domjs);

module.exports = new SiteTreeRouter(routes, siteTree, { notFound: notFoundView });
debug("view-router");
