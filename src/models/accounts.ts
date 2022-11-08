import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
interface AccountAttribute {
  id: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  walletBalance?: number;
}
export class AccountInstance extends Model<AccountAttribute> {
  userId: any;
}
AccountInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    walletBalance: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },

  {
    sequelize: db,
    tableName: 'accountTable',
  },
);
