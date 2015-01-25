"use strict";

var http = require("http");
var koa = require("koa");
var Route = require("koa-route");
var config = require("config");
var dbConfig = config.get("database");
var MongoUtil = require("./util/MongoUtil");
var UserRouter = require("./user/UserRouter");

function App(server) {

    MongoUtil.connect(dbConfig);

    server.use(Route.post("/user/create", UserRouter.create));
    return function*(next) {
        yield server;
    }
}

module.exports = App;
