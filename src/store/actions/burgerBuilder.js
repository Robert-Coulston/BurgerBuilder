import * as actionTypes from "./actionTypes";
import axios from "../.././axios-orders";

export const addIngredient = (value) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payLoad: { type: value },
  };
};

export const subtractIngredient = (value) => {
  return {
    type: actionTypes.SUBTRACT_INGREDIENT,
    payLoad: { type: value },
  };
};


const setIngredients = (value) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: value,
  };
};

const setTotalPrice = (value) => {
  return {
    type: actionTypes.SET_TOTALPRICE,
    totalPrice: value,
  };
};

const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error
  }
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.25,
  cheese: 0.3,
  meat: 1.25,
};

export const initIngredients = (value) => {
  return dispatch => {
    axios
    .get("/ingredients.json")
    .then((response) => {
      console.log("getting ingredients");

      // calculate the total initial price
      var price = 0;
      Object.keys(response.data).forEach((key, index) => {
        price = price + INGREDIENT_PRICES[key] * response.data[key];
      });
      console.log(response.data);

      dispatch(setIngredients(response.data));
      dispatch(setTotalPrice(price));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFailed(true));
    });
  }
}

