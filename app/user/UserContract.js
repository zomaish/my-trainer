"use strict";

var config = require("config");
var bcrypt = require("bcrypt");

var DEFAULT_VAUE_OVER_18 = false;
var DEFAULT_VAUE_IS_ACTIVE = false;

var UserContract = {
    forCreate: function(params) {

        var username = params.username;
        var password = params.password;

        if (!username || !password) {
            throw "missing required parameter";
        }

        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(password, salt);

        return {
            username: username,
            password: passwordHash,
            isOver18: params.isOver18 || DEFAULT_VAUE_OVER_18,
            isActive: DEFAULT_VAUE_IS_ACTIVE
        }
    }

}

module.exports = UserContract;
