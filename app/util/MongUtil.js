"use strict";

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';

var Server = require('mongodb').Server;
var dbPort = 27017;
var dbHost = 'localhost';
var dbName = 'my-trainer';

var MongoUtil = function() {
    var instance;
    var db;

    function initDB() {

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

        });

        db = new Db(dbName, new Server(dbHost, dbPort, {}, {}), {
            safe: false,
            auto_reconnect: true
        });

        db.open(function(e, d) {
            if (e) {
                console.log(e);
            } else {
                console.log('connected to database :: ' + dbName);
            }
        });
    }

    function createInstance() {
        if (typeof db === 'undefined') {
            initDB();
        }
        return db;
    }

    return {

        getDBInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },

        disconnect: function() {
            if (db) {
                db.close();
            }
        },

        bsonIdFromString: function(id) {
            var mongo = require('mongodb');
            var BSON = mongo.BSONPure;
            return new BSON.ObjectID(id);
        }
    }

};

module.exports = MongoUtil;
