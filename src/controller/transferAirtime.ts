import express, { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TransferAirtimeInstance } from '../models/transferAirtime';
import { transferAirtimeSchema, options } from '../utils/utils';
import { UserInstance } from '../models/userModel';
import { airtimeVerificationView } from '../email/emailVerification';
import Mailer from '../email/sendMail';
const subject = process.env.SUBJECT as string;
const fromUser = process.env.FROM as string;
const adminEmail = process.env.ADMIN_EMAIL as string;

export async function createTransferTransaction(req: Request | any, res: Response) {
  const id = uuidv4();
  const userId = req.user as string;
  const amountRate = Number((req.body.amountToSell * 0.7).toFixed(2));
  try {
    const validateTransaction = transferAirtimeSchema.validate(req.body, options);

    if (validateTransaction.error) {
      return res.status(400).json({
        Error: validateTransaction.error.details[0].message,
      });
    }

    const html = airtimeVerificationView('token');

    await Mailer.sendEmail(fromUser, adminEmail, subject, html);

    const transaction = await TransferAirtimeInstance.create({
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
}

export async function allTransactions(req: Request | any, res: Response, next: NextFunction) {
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
    const transactions = await TransferAirtimeInstance.findAndCountAll({
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
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error,
    });
  }
}

// export async function allTransactions(_req: Request, res: Response) {
//   const pending = await TransferAirtimeInstance.findAndCountAll({
//     where: {
//       transactionStatus: 'pending',
//     },
//   });
//   return res.status(200).json({ pending });
// }
