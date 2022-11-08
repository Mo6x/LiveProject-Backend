import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { WithdrawalInstance } from '../models/withdrawal'
import { UserInstance } from '../models/userModel'
import { AccountInstance } from '../models/accounts'
import { withdrawalSchema } from '../utils/utils'

export async function withdrawal(req: Request|any, res: Response, next: NextFunction) {
    const withdrawalId = uuidv4()
    try {
        const userID = req.user

        const { amount, bankName, accountNumber } = req.body
        const validateInput = await withdrawalSchema.validate(req.body);
        if (validateInput.error) {
            return res.status(400).json(validateInput.error.details[0].message)
        }
        const customer = await UserInstance.findOne({ where: { id:userID } })
        if (!customer) {
            return res.status(401).json({message:' Sorry customer does not exist'})
        }
        //
        const validateAccount = await AccountInstance.findOne({ where: { accountNumber } })
        if (!validateAccount) {
            return res.status(401).json({message:'Sorry this account is not registered'})
        }
        if (validateAccount.userId !== userID) {
            return res.status(401).json({message: ' Sorry this account is not registered by this customer!'})
        }
        let walletBalance = customer. walletBalance

        if (amount > walletBalance) {
            return res.status(401).json({message:'Insufficient fund!'})
        }
// fluterwave function here...
        const newWalletBalance = walletBalance - amount
        const customerUpdatedRecord = await UserInstance.update({ wallet : newWalletBalance},{ where:{id:userID}})
        const withdrawalHistory = await WithdrawalInstance.create({
            id: withdrawalId,
            amount,
            bankName,
            accountNumber,
            userID
        })
        return res.status(201).json({ message:`You have successfully withdrawn N${amount} from your wallet`, })

    } catch (error) {
        console.log(error);

    }

}

export async function getAllWithdrawals(req: Request, res: Response, next: NextFunction) {
    try {
        const allWithdrawalHistory = await WithdrawalInstance.findAll()
        if (!allWithdrawalHistory) {
            return res.status(404).json({message:'Sorry there is currently no withdrawal history!'})
        }

        return res.status(200).json(allWithdrawalHistory)

    } catch (error) {
        return res.status(500).json({message:'failed to get all withdrawal history!'})
    }
}
export async function getAllUserWithdrawals(req: Request, res: Response, next: NextFunction) {
    try {
        const userID = req.user

        const allWithdrawalHistory = await WithdrawalInstance.findAll({where:{userID}})
        if (!allWithdrawalHistory) {
            return res.status(404).json({message:'Sorry there is currently no withdrawal history!'})
        }

        return res.status(200).json(allWithdrawalHistory)

    } catch (error) {
        return res.status(500).json({message:'failed to get all withdrawal history!'})
    }
}

