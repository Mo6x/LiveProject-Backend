import express from 'express';
const router = express.Router();
import {auth} from '../middleware/auth';
import {CreateAccount, deleteBankAccount, getBankAccounts, getUserAccount} from '../controller/account';

router.post('/createaccount', auth, CreateAccount);
router.get('/getaccount', auth, getBankAccounts);
router.get('/getuseraccount/:id', auth, getUserAccount);
router.delete('/deleteaccount/:id', auth, deleteBankAccount);

export default router;
