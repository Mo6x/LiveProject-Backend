"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTransactions = exports.createTransferTransaction = void 0;
const uuid_1 = require("uuid");
const transferAirtime_1 = require("../models/transferAirtime");
const utils_1 = require("../utils/utils");
const emailVerification_1 = require("../email/emailVerification");
const sendMail_1 = __importDefault(require("../email/sendMail"));
const subject = process.env.SUBJECT;
const fromUser = process.env.FROM;
const adminEmail = process.env.ADMIN_EMAIL;
async function createTransferTransaction(req, res) {
    const id = (0, uuid_1.v4)();
    const userId = req.user;
    const amountRate = Number((req.body.amountToSell * 0.7).toFixed(2));
    try {
        const validateTransaction = utils_1.transferAirtimeSchema.validate(req.body, utils_1.options);
        if (validateTransaction.error) {
            return res.status(400).json({
                Error: validateTransaction.error.details[0].message,
            });
        }
        const html = (0, emailVerification_1.airtimeVerificationView)('token');
        await sendMail_1.default.sendEmail(fromUser, adminEmail, subject, html);
        const transaction = await transferAirtime_1.TransferAirtimeInstance.create({
            id: id,
            network: req.body.network,
            phoneNumber: req.body.phoneNumber,
            amountToSell: req.body.amountToSell,
            userId: userId,
            amountToReceive: amountRate,
        });
        return res.status(201).json({
            status: 'success',
            message: 'Successfully created transfer transaction',
            transaction,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            status: 'failed',
            message: 'Internal server error',
        });
    }
}
exports.createTransferTransaction = createTransferTransaction;
async function allTransactions(req, res, next) {
    try {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
        let size = 15;
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 15) {
            size = sizeAsNumber;
        }
        const transactions = await transferAirtime_1.TransferAirtimeInstance.findAndCountAll({
            limit: size,
            offset: page * size,
        });
        if (!transactions) {
            return res.status(404).json({ message: 'No transaction found' });
        }
        return res.status(200).json({
            content: transactions,
            totalPages: Math.ceil(transactions.count / size),
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error,
        });
    }
}
exports.allTransactions = allTransactions;
// export async function allTransactions(_req: Request, res: Response) {
//   const pending = await TransferAirtimeInstance.findAndCountAll({
//     where: {
//       transactionStatus: 'pending',
//     },
//   });
//   return res.status(200).json({ pending });
// }
