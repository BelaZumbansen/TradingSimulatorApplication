"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.findUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const password_service = __importStar(require("./password"));
const jwt_1 = require("../utils/auth/jwt");
const config = require('../config');
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.UserModel.findOne({ email: input.email });
    if (existingUser) {
        // TODO send appropriate error
        return null;
    }
    const hashVal = yield password_service.hashPassword(input.password);
    const userDoc = new user_1.UserModel({
        name: input.name,
        dateOfBirth: input.dateOfBirth,
        email: input.email,
        password: hashVal
    });
    yield userDoc.save();
    return new user_1.User(userDoc);
});
exports.createUser = createUser;
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = yield user_1.UserModel.findOne({ email: email });
    if (!userDoc) {
        return null;
    }
    return new user_1.User(userDoc);
});
exports.findUser = findUser;
// Sign Tokens for this User
const signToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Sign the Access Token
    const accessToken = (0, jwt_1.signJwt)('accessTokenSecretKey', { sub: user.email }, {
        expiresIn: `${config.jwt.accessTokenExpiresIn}m`
    });
    // Sign the Refresh Token
    const refreshToken = (0, jwt_1.signJwt)('refreshTokenSecretKey', { sub: user.email }, {
        expiresIn: `${config.jwt.refreshTokenExpiresIn}m`
    });
    // Return signed tokens
    return { accessToken, refreshToken };
});
exports.signToken = signToken;
