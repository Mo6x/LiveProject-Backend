"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const transferAirtime_1 = require("../controller/transferAirtime");
router.post('/transfer', auth_1.auth, transferAirtime_1.createTransferTransaction);
router.get('/alltransactions', transferAirtime_1.allTransactions);
exports.default = router;
