"use strict";

var DTrace = require("../util/DTrace");

var ClientContract = function() {

	if (!(this instanceof ClientContract)) {
		return new ClientContract();
	}

	this.defaultAttributes = {
		firstName: null,
		lastName: null,
		email: null,
		over18: null,
		height: null,
		weight: null,
		notes: null,
		agreedToTerms: null
	};
}

ClientContract.prototype = {

	forCreate: function(params) {
		if (!params.firstName) {
			return;
		}

		var docuemntKeys = this.defaultAttributes;

		Object.keys(docuemntKeys).forEach(function(key) {
			docuemntKeys[key] = params[key] || null;
		});

		var jsonProbe = DTrace.getProbe("jsonProbe");
		jsonProbe.fire(function() {return docuemntKeys});

		return docuemntKeys;
	},

	forUpdate: function(params) {
		if (!params.clientId) {
			return;
		}

		var docuemntKeys = this.defaultAttributes;
		docuemntKeys.clientId = params.clientId;

		Object.keys(docuemntKeys).forEach(function(key) {
			var val = params[key];

			if (val) {
				docuemntKeys[key] = val;	
			}
		});

		return docuemntKeys;
	}

};

module.exports = ClientContract;