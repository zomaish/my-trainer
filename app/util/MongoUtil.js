"use strict";

var mongojs = require('mongojs');
var _ = require("lodash");

var MongoUtil = function() {
    var instance;
    var collections;

    function buildDatabaseURL(dbConfig) {
        var host = dbConfig.host;
        var port = dbConfig.port;
        var dbName = dbConfig.dbName;
        var maxPoolSize = dbConfig.maxPoolSize;
        var databaseUrl = "mongodb://" + host + ":" + port + "/" + dbName + "?maxPoolSize=" + maxPoolSize;

        console.log("Mongo is connecting to: ", databaseUrl);
        return databaseUrl;
    }

    function createInstance(dbConfig) {
        collections = dbConfig.collections;
        instance = mongojs.connect(buildDatabaseURL(dbConfig), collections);
        indexCollections();
    }

    function getCollection(collectionName) {
        var indexOfCollection = _.indexOf(collections, collectionName);

        console.log("collections: ", collections)

        if (indexOfCollection < 0) {
            return new Error("Invalid collection");
        }

        console.log("instance.collectionName", instance.collection(collectionName));

        return instance.collection(collectionName);
    }

    function indexCollections() {

        var userCollection = getCollection("user");

        userCollection.ensureIndex({
            "username": 1
        }, {
            unique: true
        });
    }

    return {

        connect: function(dbConfig) {
            createInstance(dbConfig)
        },

        getInstance: function(dbConfig) {
            if (!instance) {
                createInstance();
            }

            return instance;
        },

        getCollection: function(collectionName) {
            return getCollection(collectionName);
        }
    };

};

module.exports = new MongoUtil();
