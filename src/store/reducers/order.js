import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../Shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_ORDER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
        error: false,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionTypes.PURCHASE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orderData,
        loading: false,
        error: false,
      });
    case actionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
