import express from 'express';
import authController from '../controllers/authController';
import validateRegister from '../validations/validateRegister';
import validateVerifyOtp from '../validations/validateVerifyOtp';
const router = express.Router();

router.post('/auth/register', validateRegister, authController.register);
router.post('/auth/verifyOtp', validateVerifyOtp, authController.verifyOtp);

export default router;
