"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("../services/login");
const signUp_1 = require("../services/signUp");
exports.userRoute = express_1.default.Router();
exports.userRoute.post('/users/login', (req, res) => {
    console.log('Received Login Request');
    (0, login_1.attemptToLogin)(req, res);
});
exports.userRoute.post('/users/signUp', (req, res) => {
    console.log('Received Sign Up request');
    (0, signUp_1.attemptToSignUp)(req, res);
});
