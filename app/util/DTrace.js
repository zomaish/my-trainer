"use strict";

var d = require('dtrace-provider');
var dtp = d.createDTraceProvider("nodeapp");

var DTrace = {

	intProbe: null,
	charProbe: null,
	jsonProbe: null,

	defineProbes: function() {
		
		this.intProbe = dtp.addProbe("probe1", "int", "int");
		this.charProbe = dtp.addProbe("probe2", "char *");
		this.jsonProbe = dtp.addProbe("j1", "forCreate");
		dtp.enable();
	},

	getProbe: function(name) {
		return this[name];
	}
};

module.exports = DTrace;
