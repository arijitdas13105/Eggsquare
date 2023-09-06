const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

router.post('/orders', async (req, res) => {
  try {
    const instance = new Razorpay({
		key_id:process.env.KEY_ID,
 		key_secret: process.env.KEY_SECRET,
 	 	// key_id: "rzp_test_AudIy7hoBdJbPk",
	  // key_secret: "kYNvwDsfM7z5CuvK6GyyaBY7",
      
    });

    const customerId = req.params.id;
    const cartItems = req.body.cartItems; // Assuming you send the cartItems from the frontend
    const cartTotal = req.body.total;

    const options = {
      amount: cartTotal * 100, // Amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something Went Wrong!' });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secretKey = 'YOUR_RAZORPAY_KEY_SECRET'; // Replace with your actual secret key

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', secretKey)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

module.exports = router;
