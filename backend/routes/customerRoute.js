const express = require('express');
const router = express.Router();
const razorpayController = require('../controller/paymentController');

const customerController = require('../controller/customerController');
const verifyToken = require('../cconfig/authMiddleware');

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.login);
router.post('/:id/addAddress', verifyToken, customerController.addAddress);
router.put('/:id/updateAddress/:addressId', verifyToken, customerController.updateAddress);
router.get('/:id/alladdress', verifyToken, customerController.getAddress);
router.post('/:id/placeOrder', verifyToken, customerController.placeOrder);
router.put('/:id/orders/:orderId/cancel',verifyToken,customerController.cancelOrder)
router.post('/:id/addcartitem', verifyToken, customerController.addCartItem);
router.get('/:id/orders', verifyToken, customerController.getUserOrder);

router.post('/createOrder', razorpayController.createRazorpayOrder);
router.post('/verify', razorpayController.verify);

module.exports = router;
