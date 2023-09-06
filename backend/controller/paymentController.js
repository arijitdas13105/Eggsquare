// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require("crypto");

const instance = new Razorpay({
  key_id:process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
  // key_id: "rzp_test_AudIy7hoBdJbPk",
  // key_secret: "kYNvwDsfM7z5CuvK6GyyaBY7",
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const customerId = req.params.id;
    const cartItems = req.body.cartItems;

    const items = cartItems.map(item => ({
      name: item.title,
      quantity: item.quantity,
      currency: 'INR',
      amount: item.total * 100, // Amount in paise
    }));

    const options = {
      amount: cartItems.reduce((total, item) => total + item.total * 100, 0),
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString("hex"),
      capture: true,
      notes: {
        // Add any additional notes if needed
      },
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verify = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "kYNvwDsfM7z5CuvK6GyyaBY7")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
