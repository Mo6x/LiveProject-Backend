import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface TransferAirtimeAttribute {
  id: string;
  network: string;
  phoneNumber: string;
  amountToSell: number;
  amountToReceive: number;
  userId: string;
  transactionStatus?: string;
}

export class TransferAirtimeInstance extends Model<TransferAirtimeAttribute> {}

TransferAirtimeInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountToSell: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    amountToReceive: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    transactionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending'
    },
  },
  {
    sequelize: db,
    tableName: 'transferAirtime',
  },
);
