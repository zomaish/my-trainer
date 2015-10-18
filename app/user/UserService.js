"use strict";

var MongoUtil = require("../util/MongoUtil");
var UserContract = require("./UserContract");

var UserService = {

    createUser: function(params) {    
        var userContract = UserContract.forCreate(params);
        var collection = MongoUtil.getCollection("user");

        collection.insert(userContract, function(error, doc) {
            console.log("insert", error, doc);
        });        
    }
}

module.exports = UserService;
