// controllers/paymentController.js

// --------------------------
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const customerId = req.params.id;

    const cartItems = req.body.cartItems;

    const items = cartItems.map((item) => ({
      name: item.title,
      quantity: item.quantity,
      currency: "INR",
      amount: item.total * 100,
    }));
    const options = {
      amount: cartItems.reduce((total, item) => total + item.total * 100, 0),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      capture: true,
      notes: {},
      capture: true,
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        
				console.log("error-paymentController-36",error);
				
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verify = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {

      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    
    console.log("error-paymentController-68",error);
				
  }
};
