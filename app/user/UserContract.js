"use strict";

// var bcrypt = require("bcrypt");

var DEFAULT_VAUE_IS_ACTIVE = false;

var UserContract = {
    forCreate: function(params) {

        var username = params.username;
        var password = params.password;

        if (!username || !password) {
            return;
        }

        // var salt = bcrypt.genSaltSync(10);
        // var passwordHash = bcrypt.hashSync(password, salt);

        var passwordHash = "sdwfde";

        return {
            username: username,
            password: passwordHash,
            isActive: DEFAULT_VAUE_IS_ACTIVE
        }
    }

}

module.exports = UserContract;
