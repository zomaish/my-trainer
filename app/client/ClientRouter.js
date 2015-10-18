"use strict";

var ClientService = require("./ClientService");
var parse = require("co-body");

var ClientRouter = {

	create: function* () {
		var body = yield parse.json(this);
		this.body = ClientService.createClient(body);
	},

	getService: function* () {
		this.body = {res: true};
	}

};

module.exports = ClientRouter;