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
exports.registerHandler = void 0;
const user_1 = require("../../services/user");
const appError_1 = __importDefault(require("../../services/appError"));
// Handle Register Request
const registerHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse Request Payload
        const createCredentials = {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            password: req.body.password,
        };
        // Attempt to create a new User
        const user = yield (0, user_1.createUser)(createCredentials);
        if (!user) {
            return next(new appError_1.default('User with this email already exists.', 401));
        }
        // Generate an Access Token and Refresh Token for this User Session
        const { accessToken, refreshToken } = yield (0, user_1.signToken)(user);
        // Send Response with Tokens
        res
            .status(200)
            .cookie('accessToken', accessToken, { httpOnly: true })
            .cookie('refreshToken', refreshToken, { httpOnly: true })
            .json({ user: user });
    }
    catch (err) {
        next(err);
    }
});
exports.registerHandler = registerHandler;
