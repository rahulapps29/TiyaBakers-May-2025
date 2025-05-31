import express from 'express';
const router = express.Router();
import { createOrder, handleCOD } from '../controllers/paymentController.js';

router.post('/order', createOrder);
router.post('/cod', handleCOD);

export default router;
