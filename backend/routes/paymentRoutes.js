import express from 'express';
const router = express.Router();
import {
  createRazorpayOrder,
  handleCOD,
  createRazorpaySession, // <-- import this
} from '../controllers/paymentController.js';

router.post('/razorpay', createRazorpayOrder);
router.post('/cod', handleCOD);
router.post('/razorpay/session', createRazorpaySession); // <-- add this route

export default router;
