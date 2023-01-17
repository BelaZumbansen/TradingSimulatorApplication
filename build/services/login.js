"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptToLogin = void 0;
const user_1 = require("../models/user");
const jwt_authentication_1 = require("../services/jwt_authentication");
function attemptToLogin(req, res) {
    const token = req.headers["authorization"];
    if (token) {
        (0, jwt_authentication_1.checkAuthToken)(token)
            .then(user_email => {
            if (user_email) {
                (0, user_1.retrieveByEmail)(user_email, token)
                    .then(user => {
                    if (user) {
                        res.json(user);
                    }
                    return;
                });
            }
        });
    }
    else {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        if (userEmail && userPassword) {
            (0, user_1.authenticateLogin)(userEmail, userPassword)
                .then(user => {
                if (user) {
                    res.json(user);
                }
                return;
            });
        }
    }
}
exports.attemptToLogin = attemptToLogin;
