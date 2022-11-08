"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWallet = exports.getUserAccount = exports.deleteBankAccount = exports.getBankAccounts = exports.CreateAccount = void 0;
const uuid_1 = require("uuid");
const accounts_1 = require("../models/accounts");
const utils_1 = require("../utils/utils");
const userModel_1 = require("../models/userModel");
async function CreateAccount(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const userID = req.user;
        const ValidateAccount = await utils_1.createAccountSchema.validateAsync(req.body, utils_1.options);
        if (ValidateAccount.error) {
            return res.status(400).json({
                status: 'error',
                message: ValidateAccount.error.details[0].message,
            });
        }
        const duplicateAccount = await accounts_1.AccountInstance.findOne({
            where: { accountNumber: req.body.accountNumber },
        });
        if (duplicateAccount) {
            return res.status(409).json({
                msg: 'Account number is used, please enter another account number',
            });
        }
        const record = await accounts_1.AccountInstance.create({
            id: id,
            bankName: req.body.bankName,
            accountNumber: req.body.accountNumber,
            accountName: req.body.accountName,
            userId: userID,
            walletBalance: req.body.walletBalance,
        });
        if (record) {
            return res.status(201).json({
                status: 'success',
                message: 'Account created successfully',
                data: record,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    }
}
exports.CreateAccount = CreateAccount;
async function getBankAccounts(req, res, next) {
    try {
        const userID = req.user;
        const account = await accounts_1.AccountInstance.findAll({
            where: { userId: userID },
        });
        if (account) {
            return res.status(200).json({
                status: 'success',
                message: 'Account retrieved successfully',
                data: account,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    }
}
exports.getBankAccounts = getBankAccounts;
async function deleteBankAccount(req, res, next) {
    try {
        const accID = req.params.id;
        const account = await accounts_1.AccountInstance.findOne({
            where: { id: accID },
        });
        if (account) {
            await account.destroy();
            return res.status(200).json({
                status: 'success',
                message: 'Account deleted successfully',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    }
}
exports.deleteBankAccount = deleteBankAccount;
async function getUserAccount(req, res, next) {
    try {
        const userID = req.user.id;
        const account = await accounts_1.AccountInstance.findOne({
            where: { userId: userID },
        });
        if (account) {
            return res.status(200).json({
                status: 'success',
                message: 'Account retrieved successfully',
                data: account,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    }
}
exports.getUserAccount = getUserAccount;
async function UpdateWallet(req, res) {
    try {
        const userID = req.user;
        console.log(req.user);
        const { amount, email } = req.body;
        const validateResult = utils_1.updateWalletSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await userModel_1.UserInstance.findOne({
            where: { id: userID },
        });
        const wallet = record === null || record === void 0 ? void 0 : record.getDataValue('wallet');
        const updatedWallet = wallet + amount;
        if (!record) {
            return res.status(404).json({
                Error: 'Cannot Find User',
            });
        }
        else {
            await record.update({ wallet: updatedWallet });
            return res.status(200).json({
                msg: 'Wallet Updated Successfully',
                updatedWallet
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: 'Internal Server Error',
        });
    }
}
exports.UpdateWallet = UpdateWallet;
