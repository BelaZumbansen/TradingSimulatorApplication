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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.authenticateLogin = exports.retrieveByEmail = exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
// Define User Schema
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 255
    },
});
// Compile User Model
const UserModel = (0, mongoose_1.model)('User', UserSchema);
class User {
    constructor(name, email, dateOfBirth, jwtToken) {
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.jwtToken = jwtToken;
    }
}
exports.User = User;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, 10)
            .then(hash => {
            return hash;
        })
            .catch(err => {
            console.log(err);
            console.log('Failed to hash and set password value');
            // Should we be exiting here?
            return '';
        });
    });
}
function comparePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, hash)
            .then(result => {
            return result;
        })
            .catch(err => {
            console.log(err);
            return false;
        });
    });
}
const generateAuthToken = function (userDoc) {
    const authToken = process.env.JWT_SECRET_KEY ? jwt.sign({ _id: userDoc._id }, process.env.JWT_SECRET_KEY) : '';
    return authToken;
};
function retrieveByEmail(email, authToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDoc = yield UserModel.findOne({ email: email });
        if (!userDoc) {
            return null;
        }
        return new User(userDoc.name, userDoc.email, userDoc.dateOfBirth, authToken);
    });
}
exports.retrieveByEmail = retrieveByEmail;
// Search database for user and authenticate based on the input credentials
function authenticateLogin(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDoc = yield UserModel.findOne({ email: email });
        if (!userDoc) {
            return null;
        }
        if (yield comparePassword(password, userDoc.password)) {
            const authToken = generateAuthToken(userDoc);
            return new User(userDoc.name, userDoc.email, userDoc.dateOfBirth, authToken);
        }
        else {
            return null;
        }
    });
}
exports.authenticateLogin = authenticateLogin;
// Attempt to register new User
function registerUser(name, dateOfBirth, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let userDoc = yield UserModel.findOne({ email: email });
        if (userDoc) {
            return null;
        }
        const hashVal = yield hashPassword(password);
        if (!hashVal || hashVal.length == 0) {
            return null;
        }
        const userDocument = new UserModel({
            name: name,
            dateOfBirth: dateOfBirth,
            email: email,
            password: hashVal
        });
        const authToken = generateAuthToken(userDocument._id);
        yield userDocument.save();
        return new User(name, email, dateOfBirth, authToken);
    });
}
exports.registerUser = registerUser;
