//userReducer

const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_ADDRESS,
  ADD_ADDRESS,ADD_TO_CUSTOMER_CART,
  GET_USER_ORDER_HISTORY_SUCCESS,LOGOUT_USER
} = require("../constants/allContants");


const initialState = {
  token: null,
  customer: null,
  addresses: [],
  error: null,
  isAuthenticated:false,
  createRazorpayOrderLoading: false,
  createRazorpayOrderError: null,
  razorpayOrder: null,
  orderHistory: [],

};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
       
        ...state,
        customer: action.payload.customer,
        token: action.payload.token,
        isAuthenticated:true,
        error: null,
      };
    case LOGIN_FAILURE:
        return {
            ...state,
            error: action.payload,
          };

  case LOGOUT_USER:
            return {
              ...state,
              isAuthenticated: false, 
            };      
    case GET_ADDRESS:
      return {
        ...state,
        addresses: action.payload,
         };
    case ADD_ADDRESS:
        return {
            ...state,
            addresses:[...state.addresses,action.payload]
        }
     case ADD_TO_CUSTOMER_CART:
      return{
        ...state,
        cartItems: action.payload,
      }   


    case GET_USER_ORDER_HISTORY_SUCCESS:
      return{
        ...state,
        orderHistory: action.payload,
      }

      
    default:
      return state;
  }
};
