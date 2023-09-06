const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  packet: { type: Number, required: true },
  total: { type: Number, required: true },
});

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pin: { type: String, required: true },
  phone: { type: Number, required: true },
  locationName: { type: String, required: true },
  landMark: { type: String, required: true },
  flatNo: { type: String, required: true },
});

const orderItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  packet: { type: Number, required: true },
  total: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  orderTotal: { type: Number, required: true },
  addressName: {
    name: { type: String, required: true },
    pin: { type: String, required: true },
    phone: { type: Number, required: true },
    locationName: { type: String, required: true },
    landMark: { type: String, required: true },
    flatNo: { type: String, required: true },
  },
  orderStatus: { type: String, required: true },
});

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  cartItems: [cartItemSchema],
  address: [addressSchema],
  orders: [orderSchema],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
