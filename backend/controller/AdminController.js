
//adminController
const Customer = require("../models/customerModel")
const Admin =require('../models/adminModel')
exports.authenticateAdmin =async(req,res)=>{
    try {
        const {username,password}=req.body;
        const admin = await Admin.findOne({username})

        const dummyAdminUsername = "arijit";
        const dummyAdminPassword = "arijit";

        // Compare the provided credentials with the dummy credentials
        if (username === dummyAdminUsername && password === dummyAdminPassword) {
            const orders= await Customer.find({},'email orders')
            console.log(orders);
            res.json(orders)
        }else {
            return res.status(401).json({ error: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error('Error authenticating admin:', error);
    res.status(500).json({ error: 'Server error' });
    }
}


exports.getAllCustomerOrders=async(req,res)=>{
try {
    const orders= await Customer.find({},'email orders')
    console.log(orders);
    res.json(orders)
} catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ error: 'Server error' });
}
}

exports.updateOrderStatus=async(req,res)=>{
try {
    const {customerId,orderId}=req.params

    const customer= await Customer.findById(customerId)
    if(!customer){
        return res.status(404).json({ error: "Customer not found" });
    }

    const orderToUpdate= customer.orders.find((order)=>order._id==orderId)
    if (!orderToUpdate) {
        return res.status(404).json({ error: "Order not found" });
      }

      orderToUpdate.orderStatus="complete"
      await customer.save()
      res.json(customer);
} catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Server error" });
}
}