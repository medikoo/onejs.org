// Setup document service for server-side process

"use strict";

const domino = require("domino")
    , domimpl = domino.createDOMImplementation();

require("../../services/document")(domimpl.createHTMLDocument());
