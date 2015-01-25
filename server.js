"use strict";

var koa = require('koa');
var server = koa();
var App = require("./app/app");

function logAllRequests() {
    server.use(function*(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        this.set('X-Response-Time', ms + 'ms');
    });

    // logger
    server.use(function*(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log('Respsonse Time For %s %s - %s ms', this.method, this.url, ms);
    });

};

logAllRequests();

server.use(App(server));
server.listen(9000);
