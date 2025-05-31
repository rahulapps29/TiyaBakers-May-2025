import Razorpay from 'razorpay';
import axios from 'axios';
import asyncHandler from 'express-async-handler';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Standard Checkout Session (v2)
// @route   POST /api/payment/razorpay/session
// @access  Public
export const createRazorpaySession = asyncHandler(async (req, res) => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  const authToken = Buffer.from(`${key_id}:${key_secret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://api.razorpay.com/v2/standard_checkout/preferences',
      {
        customer: {
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
        },
        currency: 'INR',
        amount: req.body.amount, // in paise
      },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data); // Includes session_token
  } catch (error) {
    console.error(
      'Razorpay session error:',
      error.response?.data || error.message
    );
    res.status(500).json({ message: 'Razorpay session creation failed' });
  }
});

// @desc    Create Razorpay Classic Order (v1)
// @route   POST /api/payment/razorpay
// @access  Public
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    res.status(400);
    throw new Error('Amount is required to create Razorpay order');
  }

  try {
    const options = {
      amount, // Amount in paise (e.g., ₹100 = 10000)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
});

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
