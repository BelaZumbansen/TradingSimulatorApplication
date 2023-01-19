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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAPICall = exports.persistentLoginHandler = void 0;
const appError_1 = __importDefault(require("../../services/appError"));
const user_1 = require("../../services/user");
const jwt_1 = require("./jwt");
const persistentLoginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const auth = req.cookies['accessToken'];
        console.log(auth);
        if (!auth) {
            return next(new appError_1.default('Missing Authorization Token', 401));
        }
        const verify = (0, jwt_1.verifyJwt)('accessTokenSecretKey', auth);
        if (!verify) {
            return next(new appError_1.default('Invalid or Expired Access Token', 401));
        }
        else {
            const payload = verify;
            const email = payload.sub;
            if (!email) {
                return next(new appError_1.default('Invalid Access Token Payload', 401));
            }
            const user = yield (0, user_1.findUser)(email);
            if (!user) {
                return next(new appError_1.default('No User exists for given ID', 401));
            }
            res
                .status(200).json({
                user,
            });
        }
    }
    catch (err) {
        res.status(401);
        res.json({ message: 'Failed' });
    }
});
exports.persistentLoginHandler = persistentLoginHandler;
const authorizeAPICall = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = req.headers ? req.headers.authorization : null;
        if (!auth) {
            return next(new appError_1.default('Missing Authorization Token', 401));
        }
        const verify = (0, jwt_1.verifyJwt)('accessTokenSecretKey', auth);
        if (!verify) {
            return next(new appError_1.default('Invalid or Expired Access Token', 401));
        }
        else {
            const payload = verify;
            const email = payload.sub;
            if (!email) {
                return next(new appError_1.default('Invalid Access Token Payload', 401));
            }
            const user = yield (0, user_1.findUser)(email);
            if (!user) {
                return next(new appError_1.default('No User exists for given ID', 401));
            }
        }
    }
    catch (err) {
        next(err);
    }
    return true;
});
exports.authorizeAPICall = authorizeAPICall;
