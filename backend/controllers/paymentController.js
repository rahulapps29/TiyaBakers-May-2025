import Razorpay from 'razorpay';
import asyncHandler from 'express-async-handler';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/razorpay
// @access  Public
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body; // amount in paise, e.g. 50000 = ₹500
  const currency = 'INR';

  const options = {
    amount,
    currency,
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  const response = await razorpay.orders.create(options);

  if (!response) {
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  } else {
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  }
});

// @desc    Handle Cash on Delivery Order
// @route   POST /api/payment/cod
// @access  Public
export const handleCOD = asyncHandler(async (req, res) => {
  const { orderDetails } = req.body;

  // Save the COD order in DB if needed (simulate here)
  // You could also trigger SMS/email notifications, etc.

  res.status(200).json({
    message: 'Cash on Delivery order placed successfully',
    order: {
      id: `cod_${Date.now()}`,
      status: 'PENDING',
      ...orderDetails,
    },
  });
});
