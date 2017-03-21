"use strict";

const Domjs    = require("domjs")
    , debug    = require("debug")("service")
    , document = require("./document");

module.exports = new Domjs(document);

debug("domjs");
