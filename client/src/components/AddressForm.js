import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../redux/actions/userActions"; // Import the addAddress action
import "./AddressForm.css";
import { useNavigate } from "react-router-dom";

function AddressForm({ closeModal }) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [locationName, setLocationName] = useState("");
  const [landMark, setLandMark] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userId = user.customer._id;
      const addressData = { name, pin, phone, locationName, landMark, flatNo };

      dispatch(addAddress(userId, addressData)); 
      console.log(user.customer.address);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="address-form-container">
      <h2>Add Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (First and Last name)"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Pincode"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile number"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="locationName"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Area, Street, Sector, Village"
            required
          />
          <input
            type="text"
            id="flatNo"
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            placeholder="Flat, House no., Building, Company, Apartment"
            required
          />
          <input
            type="text"
            id="landmark"
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
            placeholder="Landmark (e.g., near Apollo Hospital)"
            required
          />
        </div>
        <button type="submit">Add Address</button>
      </form>
    </div>
  );
}

export default AddressForm;

