

//cartReducer

import {
  CART_ADD,
  ALL_CART,
  PACKET_INCREASE,
  PACKET_DECREASE,
} from "../constants/allContants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case ALL_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case PACKET_INCREASE:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                packet: item.packet + 1,
                total: item.price * item.quantity * (item.packet + 1),
              }
            : item
        ),
      };

    case PACKET_DECREASE:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                packet: item.packet - 1,
                total: item.price * item.quantity * (item.packet - 1),
              }
            : item
        ),
      };

    default:
      return state;
  }
};
