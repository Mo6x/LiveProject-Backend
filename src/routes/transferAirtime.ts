import express from 'express';
const router = express.Router();
import { auth } from '../middleware/auth';
import { createTransferTransaction, allTransactions,  } from '../controller/transferAirtime';

router.post('/transfer', auth, createTransferTransaction);
router.get('/alltransactions', allTransactions);

export default router;
