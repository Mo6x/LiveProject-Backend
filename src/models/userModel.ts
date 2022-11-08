import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface UserAtribute {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  isVerified?: boolean;
  role?: string;
  wallet?: number;
}

export class UserInstance extends Model<UserAtribute> {
  walletBalance: any;
}

UserInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.TEXT,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: false,
      // defaultValue: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
    },
    wallet: {
      type: DataTypes.STRING,
      defaultValue: '0'
    }
  },
  {
    sequelize: db,
    tableName: 'userTable',
  },
);
