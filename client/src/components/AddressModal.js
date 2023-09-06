import React from "react";
import AddressForm from "./AddressForm";

function AddressModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-modal" onClick={closeModal}>
          &times;
        </span>
        <h2>Add Address</h2>
        <AddressForm closeModal={closeModal} />
      </div>
    </div>
  );
}

export default AddressModal;
