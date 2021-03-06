"use strict";

var mongojs = require('mongojs');

var MongoUtil = function() {
    var _instance;
    var collections;

    function buildDatabaseURL(dbConfig) {
        var host = dbConfig.host;
        var port = dbConfig.port;
        var dbName = dbConfig.dbName;
        var maxPoolSize = dbConfig.maxPoolSize;
        var databaseUrl = "mongodb://" + host + ":" + port + "/" + dbName + "?maxPoolSize=" + maxPoolSize;

        return databaseUrl;
    }

    function createInstance(dbConfig) {
        collections = dbConfig.collections;
        _instance = mongojs.connect(buildDatabaseURL(dbConfig), collections);
        indexCollections();
    }

    function getCollection(collectionName) {
        var indexOfCollection = collections.indexOf(collectionName);
        var instance = _instance;

        if (indexOfCollection < 0) {
            return;
        }

        return instance.collection(collectionName);
    }

    function indexCollections() {

        var userCollection = getCollection("user");
        var clientCollection = getCollection("client");

        userCollection.ensureIndex({
            "username": 1
        }, {
            unique: true
        });

        clientCollection.ensureIndex({
            "firstName": 1,
            "lastName": 1
        }, {
            unique: true
        });
    }

    function connect(dbConfig) {
        if (!_instance) {
            createInstance(dbConfig);
        }
    }
    return {
        connect: connect,
        getCollection: getCollection
    };

};

module.exports = new MongoUtil();
