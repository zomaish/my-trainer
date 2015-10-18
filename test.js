var MongoUtil = function() {
    var instance;
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
        instance = mongojs.connect(buildDatabaseURL(dbConfig), collections);
        indexCollections();
    }

    function getCollection(collectionName) {
        var indexOfCollection = collections.indexOf(collectionName);

        if (indexOfCollection < 0) {
            return new Error("Invalid collection");
        }

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

    function connect(dbConfig) {
        if (!instance) {
            createInstance(dbConfig);
        }
    }
    return {
        connect: connect,
        getCollection: getCollection
    };

};

function printStatus(fn) {
	switch(%GetOptimizationStatus(fn)) {
		case 1: console.log('Function is optimized'); break;
		case 2: console.log('Function is not optimized'); break;
		case 3: console.log('Function is always optimized'); break;
		case 4: console.log('Function is never optimized'); break;
		case 6: console.log('Function is maybe deoptimized'); break;
	}
}


var dbConfig = {
	
};

var x = new MongoUtil();
x.connect();

%OptimizeFunctionOnNextCall(x.connect;
x.connect({"host": "rere"})
 printStatus(x.connect());

console.log(%HasFastProperties(testOpt));
