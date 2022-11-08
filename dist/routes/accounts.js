"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const account_1 = require("../controller/account");
router.post('/createaccount', auth_1.auth, account_1.CreateAccount);
router.get('/getaccount', auth_1.auth, account_1.getBankAccounts);
router.get('/getuseraccount/:id', auth_1.auth, account_1.getUserAccount);
router.delete('/deleteaccount/:id', auth_1.auth, account_1.deleteBankAccount);
exports.default = router;
