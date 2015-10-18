"use strict";

var http = require("http");
var koa = require("koa");
var Route = require("koa-route");
var config = require("config");
var MongoUtil = require("./util/MongoUtil");
var UserRouter = require("./user/UserRouter");

function App(server) {
	var dbConfig = config.get("database");
    MongoUtil.connect(dbConfig);

    server.use(Route.post("/user/create", UserRouter.create));
    

    return function*(next) {
        yield server;
    }
}

module.exports = App;
