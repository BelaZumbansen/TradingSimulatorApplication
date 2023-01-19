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
exports.loginHandler = exports.logoutHandler = void 0;
const user_1 = require("../../services/user");
const password_1 = require("../../services/password");
const appError_1 = __importDefault(require("../../services/appError"));
const logoutHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('accessToken').clearCookie('refreshToken');
        res.status(200).send();
    }
    catch (err) {
        res.status(200).send();
    }
});
exports.logoutHandler = logoutHandler;
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginCredentials = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = yield (0, user_1.findUser)(loginCredentials.email);
        if (!user ||
            !(yield (0, password_1.comparePassword)(loginCredentials.password, user.hashPass))) {
            return next(new appError_1.default('Invalid email or password', 401));
        }
        const { accessToken, refreshToken } = yield (0, user_1.signToken)(user);
        // Send Response
        res
            .status(200)
            .cookie('accessToken', accessToken, {
            httpOnly: true,
        })
            .cookie('refreshToken', refreshToken, {
            httpOnly: true,
        })
            .json({
            user: user
        });
    }
    catch (err) {
        next(err);
    }
});
exports.loginHandler = loginHandler;
