"use strict";

var UserContract = require("../../app/user/UserContract");

describe("UserContract", function() {

    describe("Valide user data", function() {

        it("Passes valide user data to create", function() {
            var contract = UserContract.forCreate({});

            var expectedContract = {
                userName: "Zaid",
                passWord: "passWord"
            };

            expect(contract).toBe(expectedContract);
        });
    });
});
