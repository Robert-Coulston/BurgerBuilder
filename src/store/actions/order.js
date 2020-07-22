import * as actionTypes from "./actionTypes";
import axios from "../.././axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAILURE,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    const url = `/orders.json?auth=${token}`
    axios
      .post(url, orderData)
      .then((response) => {
        console.log("purchaseBurgerStart response", response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        dispatch(purchaseInit());
      })
      .catch((error) => {
        console.log("purchaseBurgerFailure", error);
        dispatch(purchaseBurgerFailure(error));
        dispatch(purchaseInit());
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    let url = `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    console.log("fetch orders url",url);

    axios
      .get(url)
      .then((response) => {
        const orderData = [];
        for (let key in response.data) {
          orderData.push({ ...response.data[key], id: key });
        }
        console.log(orderData);

        setTimeout(() => {
          console.log("simulating longer load time");
          dispatch(fetchOrdersSuccess(orderData));
        },2000);
      })
      .catch((err) => {
        dispatch(fetchOrdersFailure(err))
      });

  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orderData) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orderData: orderData
  };
};

export const fetchOrdersFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
};
