"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'First name is needed',
            },
            notEmpty: {
                msg: 'First name cannot be empty',
            },
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Email is needed',
            },
            notEmpty: {
                msg: 'Email cannot be empty',
            },
        },
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Phone number is needed',
            },
            notEmpty: {
                msg: 'Phone number cannot be empty',
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: 'user' },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: false,
        // defaultValue: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
    },
    wallet: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '0'
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'userTable',
});
