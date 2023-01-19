"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("../utils/auth/login");
const signUp_1 = require("../utils/auth/signUp");
const access_1 = require("../utils/auth/access");
const refresh_1 = require("../utils/auth/refresh");
exports.authRoute = express_1.default.Router();
exports.authRoute.post('/api/auth/login', (req, res, next) => {
    console.log('Received Login Request');
    (0, login_1.loginHandler)(req, res, next);
});
exports.authRoute.post('/api/auth/signUp', (req, res, next) => {
    console.log('Received Sign Up Request');
    (0, signUp_1.registerHandler)(req, res, next);
});
exports.authRoute.get('/api/auth/persistentLogin', (req, res, next) => {
    console.log('Received Persistent Login Request');
    (0, access_1.persistentLoginHandler)(req, res, next);
});
exports.authRoute.get('/api/auth/refresh', (req, res, next) => {
    console.log('Received a Refresh Token Request');
    (0, refresh_1.refreshHandler)(req, res, next);
});
