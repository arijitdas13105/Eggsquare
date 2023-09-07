//CustomerController.js

const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const verifyToken = require("../cconfig/authMiddleware");
//register  customer

exports.registerCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    let customer = await Customer.findOne({ email });

    if (customer) {
      return res.status(400).json({ error: "already exist" });
    }

    customer = new Customer({ email, password });

    await customer.save();
    res.json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error("Error in registerCustomer:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//login customer

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    if (customer.password !== password) {
      return res.status(401).json({ error: "invalid password" });
    }
    const token = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({ success: true, customer: customer, tokens: token });
  } catch (error) {
    console.error("Error in loginCustomer:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for adding a new address to customer's address list
exports.addAddress = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { name, pin, phone, locationName, landMark, flatNo } = req.body;

    if (req.customerId !== customerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    customer.address.push({ name, pin, phone, locationName, landMark, flatNo });

    await customer.save();

    res.json({ message: "Address added successfully", customer });
  } catch (error) {
    console.error("Error in addAddress:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const customerId = req.params.id;
    const addressId = req.params.addressId;

    if (req.customerId !== customerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const addressToUpdate = customer.address.id(addressId);
    if (!addressToUpdate) {
      return res.status(404).json({ error: "Address not found" });
    }
    addressToUpdate.name = req.body.name;
    addressToUpdate.pin = req.body.pin;
    addressToUpdate.phone = req.body.phone;
    addressToUpdate.locationName = req.body.locationName;
    addressToUpdate.landMark = req.body.landMark;
    addressToUpdate.flatNo = req.body.flatNo;

    await customer.save();
    res.json({ message: "Address updated successfully", customer });
  } catch (error) {
    console.error("Error in updateAddress:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for fetching all addresses of a customer
exports.getAddress = async (req, res) => {
  try {
    const customerId = req.params.id;
    if (req.customerId !== customerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const addresses = customer.address;

    res.json(addresses);
  } catch (error) {
    console.error("Error in getAddress:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// addCart

exports.addCartItem = async (req, res) => {
  try {
    const customerId = req.params.id;
    const cartItemData = req.body;

    if (req.customerId !== customerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    if (
      !Array.isArray(cartItemData) ||
      cartItemData.some(
        (item) =>
          typeof item.title !== "string" ||
          typeof item.price !== "number" ||
          typeof item.image !== "string" ||
          typeof item.quantity !== "number" ||
          typeof item.packet !== "number" ||
          typeof item.total !== "number"
      )
    ) {
      return res.status(400).json({ error: "Invalid cartItemData format" });
    }
    customer.cartItems = [];

    cartItemData.forEach((item) => {
      customer.cartItems.push({
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        packet: item.packet,
        total: item.total,
      });
    });
    await customer.save();

    res.json({
      message: "Cart items added successfully",
      cartItems: cartItemData,
    });
  } catch (error) {
    console.error("Error adding cart item to customer's cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { cartItems, orderTotal, address, status } = req.body;

    const customer = await Customer.findById(customerId);
    const selectedAddress = customer.address.id(address);
    if (req.customerId != customerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }

    const orderItem = cartItems.map((item) => ({
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      packet: item.packet,
      total: item.total,
    }));
    const order = {
      items: cartItems,
      orderTotal: orderTotal,
      addressName: selectedAddress,
      orderStatus: status,
    };
    if (customer) {
      customer.orders.push(order);
      await customer.save();
      res.json({ message: "Order placed successfully", order });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Server error", error });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const customerId = req.params.id;
    if (req.customerId !== customerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(401)
        .json({ error: "Unauthorized, invalid customerId" });
    }
    const orderHistory = customer.orders;
    res.json(orderHistory);
  } catch (error) {
    console.error("Error fetching user's order history:", error);
    res.status(500).json({ error: "Server error" });
  }
};
