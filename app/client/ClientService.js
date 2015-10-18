"use strict";

var MongoUtil = require("../util/MongoUtil");
var ClientContract = require("./ClientContract");
var CLIENT_COLLECTION = "client";

var ClientService = {

	collection: MongoUtil.getCollection(CLIENT_COLLECTION),

	createClient: function(params) {
		var clientContract = new ClientContract();
		var clientInfo = clientContract.forCreate(params);
		
		if (!clientInfo) {
			return;
		}

        this.collection.insert(clientInfo, function(error, doc) {
            console.log("insert client", error, doc);
        });
	},

	updateClient: function(params) {
		var clientContract = new ClientContract();
		var clientInfo = clientContract.forUpdate(params);
		
		if (!clientInfo) {
			return;
		}

        this.collection.insert(clientInfo, function(error, doc) {
            console.log("insert client", error, doc);
        });
	}
};

module.exports = ClientService;