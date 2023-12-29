import "./App.css";

import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
// import ProductContainer, { products } from "./components/ProductContainer";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Login from "./components/Login";
import CheckOut from "./components/CheckOut";
import AddressForm from "./components/AddressForm";
import OrderHistory from "./components/OrderHistory";
import AdminPanel from "./components/AdminPanel";
import Register from "./components/Register";
import Sucess from "./components/Sucess";
import Cancel from "./components/Cancel"
import Product,{ products } from "./components/Product";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/products" element={<ProductContainer/>} /> */}
        <Route exact path="/products" element={<Product/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register/>} />
        <Route
          path="/product/:id"
          element={<ProductDetails products={products} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/add-address" element={<AddressForm />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/sucess" element={<Sucess />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;
