//adminRoute
const express=require('express')
const router=express.Router()

const adminController =require('../controller/AdminController')
router.post('/login', adminController.authenticateAdmin);

router.get('/orders', adminController.getAllCustomerOrders);
router.put('/:customerId/orders/:orderId/update', adminController.updateOrderStatus);

module.exports=router




