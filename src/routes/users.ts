import express from 'express';
// import { validate } from 'uuid';
import {
  registerUser,
  loginUser,
  updateUserRecord,
  verifyUser,
  forgotPassword,
  changePassword,
  singleUser,
  } from '../controller/userController'
  import { UpdateWallet } from '../controller/account';
// import { forgotPassword, resetPassword } from '../controllers/userController';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/getsingle/:id', singleUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/edit/:id', auth, updateUserRecord);
router.get('/verify/:token', verifyUser);
router.post('/forgotpassword', forgotPassword);
router.post('/change-password/:id', changePassword);
router.patch('/updatewallet/:id', auth, UpdateWallet);

export default router;
