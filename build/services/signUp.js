"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptToSignUp = void 0;
const user_1 = require("../models/user");
function attemptToSignUp(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const dateOfBirth = req.body.dateOfBirth;
    const password = req.body.password;
    if (name && email && dateOfBirth && password) {
        (0, user_1.registerUser)(name, dateOfBirth, email, password)
            .then(user => {
            if (user) {
                res.json(user);
            }
        });
    }
}
exports.attemptToSignUp = attemptToSignUp;
