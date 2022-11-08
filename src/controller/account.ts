import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { AccountInstance } from '../models/accounts';
import { createAccountSchema, updateWalletSchema, options } from '../utils/utils';
import { UserInstance } from '../models/userModel';

export async function CreateAccount(req: Request | any, res: Response, next: NextFunction) {
  const id = uuidv4();
    try {
            
         const userID = req.user
         const ValidateAccount = await createAccountSchema.validateAsync(req.body, options);
         if (ValidateAccount.error) {
                return res.status(400).json({
                    status: 'error',
                    message: ValidateAccount.error.details[0].message,
                });
         }
         const duplicateAccount = await AccountInstance.findOne({
                where: { accountNumber: req.body.accountNumber },
         })
         if ( duplicateAccount) {
            return res.status(409).json({
                msg: 'Account number is used, please enter another account number',
                });
        }
        const record = await AccountInstance.create({
            id: id,
            bankName: req.body.bankName,
            accountNumber: req.body.accountNumber,
            accountName: req.body.accountName,
            userId: userID,
            walletBalance: req.body.walletBalance,
        })
        if (record) {
            return res.status(201).json({
                status: 'success',
                message: 'Account created successfully',
                data: record,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    }
  
}

export async function getBankAccounts(req: Request | any, res: Response, next: NextFunction) {
  try {
    const userID = req.user;
    const account = await AccountInstance.findAll({
      where: { userId: userID },
    });
    if (account) {
      return res.status(200).json({
        status: 'success',
        message: 'Account retrieved successfully',
        data: account,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
}

interface jwtpayload {
  token: string;
}
export async function deleteBankAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const accID = req.params.id;
    const account = await AccountInstance.findOne({
      where: { id: accID },
    });
    if (account) {
      await account.destroy();
      return res.status(200).json({
        status: 'success',
        message: 'Account deleted successfully',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
}
export async function getUserAccount(req: Request | any, res: Response, next: NextFunction) {
  try {
    const userID = req.user.id;
    const account = await AccountInstance.findOne({
      where: { userId: userID },
    });
    if (account) {
      return res.status(200).json({
        status: 'success',
        message: 'Account retrieved successfully',
        data: account,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
}

export async function UpdateWallet(req: Request|any, res: Response) {
  try {
    const userID = req.user;
    console.log(req.user);
    const { amount, email } = req.body
    const validateResult = updateWalletSchema.validate(req.body, options)
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message
      })
    }
    const record = await UserInstance.findOne({
      where: { id: userID },
    });
    const wallet = record?.getDataValue('wallet')
    const updatedWallet = wallet + amount
    if (!record) {
      return res.status(404).json({
        Error: 'Cannot Find User',
      })
    } else {
      await record.update({ wallet: updatedWallet })
      return res.status(200).json({
        msg: 'Wallet Updated Successfully',
        updatedWallet
      })
    }
  } catch (error){
    console.log(error)
    return res.status(500).json({
      Error: 'Internal Server Error',
    })
  }
}
