"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalSchema = exports.updateWalletSchema = exports.transferAirtimeSchema = exports.createAccountSchema = exports.userUpdateSchema = exports.options = exports.generateToken = exports.changePasswordSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerUserSchema = joi_1.default.object()
    .keys({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    avatar: joi_1.default.string(),
    isVerified: joi_1.default.boolean(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
})
    .with('password', 'confirmPassword');
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase(),
    username: joi_1.default.string().trim().lowercase(),
    password: joi_1.default.string().required(),
});
exports.changePasswordSchema = joi_1.default.object()
    .keys({
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
})
    .with('password', 'confirmPassword');
const generateToken = (user) => {
    const passPhrase = process.env.JWT_SECRETE;
    return jsonwebtoken_1.default.sign(user, passPhrase, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};
exports.userUpdateSchema = joi_1.default.object().keys({
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    phoneNumber: joi_1.default.string().length(11),
    avatar: joi_1.default.string(),
    wallet: joi_1.default.number(),
});
exports.createAccountSchema = joi_1.default.object().keys({
    bankName: joi_1.default.string().trim().required(),
    accountNumber: joi_1.default.string()
        .trim()
        .required()
        .pattern(/^[0-9]+$/)
        .length(10),
    accountName: joi_1.default.string().trim().required(),
    walletBalance: joi_1.default.number().default(0),
});
exports.transferAirtimeSchema = joi_1.default.object().keys({
    network: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    amountToSell: joi_1.default.number().min(100).required(),
    sharePin: joi_1.default.string()
        .length(4)
        .pattern(/^[0-9]+$/)
        .required(),
});
exports.updateWalletSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    amount: joi_1.default.number().default(0),
});
exports.withdrawalSchema = joi_1.default.object().keys({
    accountNumber: joi_1.default.string()
        .trim()
        .required()
        .pattern(/^[0-9]+$/)
        .length(10),
    bankName: joi_1.default.string().trim().required(),
    amount: joi_1.default.number().required(),
});
