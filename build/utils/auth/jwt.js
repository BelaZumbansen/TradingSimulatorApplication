"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = require('../../config');
// Generate and Sign a new JWT Authentication Token
const signJwt = (keyID, payload, options = {}) => {
    try {
        // Retrieve and Decrypt the Secret Key
        const secretKey = Buffer.from(config.jwt[keyID], 'base64').toString('ascii');
        // Sign Token and attach Payload
        return jsonwebtoken_1.default.sign(payload, secretKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'HS256' }));
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
exports.signJwt = signJwt;
// Verify JWT Token
const verifyJwt = (keyID, token) => {
    try {
        // Retrieve and Decrypt the Secret Key
        const secretKey = Buffer.from(config.jwt[keyID], 'base64').toString('ascii');
        // Verify Token
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
exports.verifyJwt = verifyJwt;
