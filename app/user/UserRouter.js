"use strict";

var UserService = require("./UserService");
var parse = require("co-body");

var UserRouter = {

    create: function* create() {
        var data =
            yield parse.json(this);

        this.body = UserService.createUser(data);
    }

}

module.exports = UserRouter;
