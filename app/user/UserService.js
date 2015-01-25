"use strict";

var MongoUtil = require("../util/MongoUtil");
var UserContract = require("./UserContract");

var UserService = {

    createUser: function(data) {

        try {
            var userContract = UserContract.forCreate(data);
            var collection = MongoUtil.getCollection("user");

            console.log("collection is:", collection);

            collection.insert(userContract, function(error, doc) {
                console.log("insert", error, doc);
            });

        } catch (err) {
            console.log("error", err);
            throw err;
        }
    }
}

module.exports = UserService;
