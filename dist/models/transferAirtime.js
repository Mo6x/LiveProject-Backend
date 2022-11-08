"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferAirtimeInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class TransferAirtimeInstance extends sequelize_1.Model {
}
exports.TransferAirtimeInstance = TransferAirtimeInstance;
TransferAirtimeInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    network: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amountToSell: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    amountToReceive: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    transactionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending'
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'transferAirtime',
});
