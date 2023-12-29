

// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");


const verifyToken=require('../cconfig/authMiddleware')

router.post("/orders", async (req, res) => {

	try {
		const instance = new Razorpay({
    //   key_id: process.env.KEY_ID,
    //   key_secret: process.env.KEY_SECRET,

	 
      key_id: "rzp_test_AudIy7hoBdJbPk",
      key_secret: "kYNvwDsfM7z5CuvK6GyyaBY7",

        });
        const cartTotal=req.body.total
        


		const options = {
      
          amount:cartTotal*100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log("error-ordraroute-40",error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			
			console.log("data-ordraroute-44",order);
				
			res.status(200).json({ data: order });
		});
	} catch (error) {
		
		console.log("error-ordraroute-47",error);
				
		res.status(500).json({ message: "Internal Server Error!" });
	}
});

router.post("/verify",async (req, res) => {
	try {
		console.log("okay boi!!");
        const { customerId } = req.params;
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256","kYNvwDsfM7z5CuvK6GyyaBY7")
			// .createHmac("sha256",process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log("error is here",error);
	}
});


module.exports = router;

