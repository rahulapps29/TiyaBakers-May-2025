import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';

import dotenv from 'dotenv';
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

dotenv.config();

export const createOrder = async (req, res) => {
  try {
    console.log('✅ Creating Razorpay Order...');
    console.log('Requested amount:', req.body.amount);
    console.log(process.env.RAZORPAY_KEY_ID);

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount,
      currency: 'INR',
      receipt: 'receipt_order_' + Date.now(),
    };

    const order = await instance.orders.create(options);
    console.log('✅ Razorpay order created:', order);
    res.json(order);
  } catch (error) {
    console.error('🔴 Razorpay createOrder error:', error);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
};

// @desc    Handle Cash on Delivery Order
// @route   POST /api/payment/cod
// @access  Public
export const handleCOD = asyncHandler(async (req, res) => {
  const { orderDetails } = req.body;

  res.status(200).json({
    message: 'Cash on Delivery order placed successfully',
    order: {
      id: `cod_${Date.now()}`,
      status: 'PENDING',
      ...orderDetails,
    },
  });
});
