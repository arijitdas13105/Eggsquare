

// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
// const { Stripe } = require('stripe');

const stripe = require('stripe')('sk_test_51OOZUMSGnjCjqYGboEZdof5fe89DAfC8zDSQajJVUGXVw1NmezNMIJFJMi3vVdWTxvw74bEfVidn7hurVV2E247I00x7pIxowK');
// const stripe = new Stripe('sk_test_51OOZUMSGnjCjqYGboEZdof5fe89DAfC8zDSQajJVUGXVw1NmezNMIJFJMi3vVdWTxvw74bEfVidn7hurVV2E247I00x7pIxowK'); // Use your own secret key here

const verifyToken=require('../cconfig/authMiddleware');
const Customer = require('../models/customerModel');
const { title } = require('process');
const YOUR_DOMAIN = 'http://localhost:5000';

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

//  stripe

router.post('/create-checkout-session', async (req, res) => {
	const {products,customerId} = req.body;
	console.log("custoomer is ",customerId)
	const total = products.reduce((accumulator, item) => {
		return accumulator + item.total;
	  }, 0);
// const lineItems=products
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title,
            },
            unit_amount:product.price*product.packet * 100,
        },
        quantity:product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
		billing_address_collection: 'required',
        line_items:lineItems,
        mode:"payment",
        success_url:"https://eggsquare.onrender.com/sucess",
        cancel_url:"https://eggsquare.onrender.com/cancel",
        // success_url:"http://localhost:3000/sucess",
        // cancel_url:"http://localhost:3000/cancel",
		
    });

	const customer= await Customer.findById(customerId)
	const order = {
		customer: customerId,
		products: products,
		total: total,
		payment_status: 'pending', // You might want to set this to 'success' after successful payment
		// Add other order details as needed
	  };
  
	  // Replace the following with your actual logic to save the order in the database
	  // For example, if you are using Mongoose:
	  // const savedOrder = await OrderModel.create(order);
  
	  console.log('Order saved:', order);

	  const newOrder = {
		items: products.map((product) => ({
		  title: product.title,
		  price: product.price,
		  image: product.image,
		  quantity: product.quantity,
		  packet: product.packet,
		  total: product.total,
		})),
		orderTotal: total,
		addressName: customer.address[0], 
		orderStatus: 'pending',
	  };

	  customer.orders.push(newOrder)
	  await customer.save()
    res.json({id:session.id})
  });




  
module.exports = router;

