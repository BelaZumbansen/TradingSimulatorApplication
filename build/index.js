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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const app_1 = __importDefault(require("./config/app"));
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const authRouter_1 = require("./routes/authRouter");
const mongoose_1 = __importDefault(require("mongoose"));
// Set Up
dotenv.config();
const PORT = process.env.PORT || 3001;
mongoose_1.default.connect((_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '');
mongoose_1.default.set('strictQuery', true);
exports.routes = express_1.default.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app_1.default.use(bodyParser.json());
app_1.default.use(cookieParser());
app_1.default.use('/', exports.routes);
exports.routes.use(authRouter_1.authRoute);
app_1.default.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
