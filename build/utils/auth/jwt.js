"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = require('../../config');
const signJwt = (keyID, payload, options = {}) => {
    const secretKey = Buffer.from(config.jwt[keyID], 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(payload, secretKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'HS256' }));
};
exports.signJwt = signJwt;
const verifyJwt = (keyID, token) => {
    try {
        const secretKey = Buffer.from(config.jwt[keyID], 'base64').toString('ascii');
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
