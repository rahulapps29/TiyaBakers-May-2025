import express from 'express';
const router = express.Router();
import {
  createRazorpayOrder,
  handleCOD,
} from '../controllers/paymentController.js';

router.post('/razorpay', createRazorpayOrder);
router.post('/cod', handleCOD);

export default router;
