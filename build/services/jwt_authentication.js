"use strict";
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
exports.invalidateToken = exports.storeAuthToken = exports.checkAuthToken = void 0;
const mongoose_1 = require("mongoose");
const JWTTokenSchema = new mongoose_1.Schema({
    authToken: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    expiry: { type: Date, required: true }
});
const JWT = (0, mongoose_1.model)('JWT', JWTTokenSchema);
function checkAuthToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenDoc = yield JWT.findOne({ authToken: token });
        if (!tokenDoc) {
            return null;
        }
        if (tokenDoc.expiry >= new Date()) {
            tokenDoc.remove();
            return null;
        }
        return tokenDoc.email;
    });
}
exports.checkAuthToken = checkAuthToken;
function storeAuthToken(token, email) {
    const thisInstant = new Date();
    thisInstant.setUTCHours(thisInstant.getUTCHours() + 12);
    JWT.create({ authToken: token, email: email, expiry: thisInstant });
}
exports.storeAuthToken = storeAuthToken;
function invalidateToken(token) {
    JWT.findOneAndDelete({ authToken: token });
}
exports.invalidateToken = invalidateToken;
