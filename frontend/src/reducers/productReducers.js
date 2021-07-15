import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_RESET,
  } from "../constants/productConstants";

export const productListReducer = (state={products:[]}, action) => {
  switch(action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products:[] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// 24 Add Reducer to ProductScreen
export const productDetailsReducer = (state = {product: {reviews:[]} }, action) => {
  switch(action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}