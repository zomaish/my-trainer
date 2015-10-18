"use strict";

var koa = require("koa");
var Route = require("koa-route");
var config = require("config");
var MongoUtil = require("./app/util/MongoUtil");
var dbConfig = config.get("database");

MongoUtil.connect(dbConfig);

var UserRouter = require("./app/user/UserRouter");
var ClientRouter = require("./app/client/ClientRouter");
var server = koa();


var DTrace = require("./app/util/DTrace");

function logAllRequests() {
    server.use(function*(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        this.set("X-Response-Time", ms + "ms");
    });

    // logger
    server.use(function*(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log("Respsonse Time For %s %s - %s ms", this.method, this.url, ms);
    });
};

function ignoreAssets() {
    server.use(function *(next){
        if (!(/(\.js|\.css|\.ico)$/.test(this.path))) {
            yield next;
        } else {
            console.log("error", "Invalid Request for assets");
        }
    });
}


function startServer() {

    DTrace.defineProbes();
    
    server.use(Route.post("/user/create", UserRouter.create));
    server.use(Route.post("/client/create", ClientRouter.create));

    server.use(Route.get("/client/get", ClientRouter.getService));
    
    server.listen(9000);
}

// logAllRequests();
// ignoreAssets();
startServer();

