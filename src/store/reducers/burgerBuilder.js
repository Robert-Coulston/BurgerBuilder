import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../../store/utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.25,
  cheese: 0.3,
  meat: 1.25
};

const setPrice = (state, type, updatedCount) => {
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[type] = updatedCount;
  const priceValue = INGREDIENT_PRICES[type];
  const oldPrice = state.totalPrice;
  return { oldPrice, priceValue, updatedIngredients };
};

const addIngredientHandler = (state, type) => {
  const oldCount = state.ingredients[type];
  const updatedCount = oldCount + 1;

  const { oldPrice, priceValue, updatedIngredients } = setPrice(
    state,
    type,
    updatedCount
  );
  const newPrice = oldPrice + priceValue;
  return { totalPrice: newPrice, ingredients: updatedIngredients, building: true }; // building means that ingredients have changed
};

const subtractIngredientHandler = (state, type) => {
  const oldCount = state.ingredients[type];

  if (oldCount >= 1) {
    const updatedCount = oldCount - 1;

    const { oldPrice, priceValue, updatedIngredients } = setPrice(
      state,
      type,
      updatedCount
    );
    const newPrice = oldPrice - priceValue;

    return { totalPrice: newPrice, ingredients: updatedIngredients, building: true }; // building means that ingredients have changed
  }
};

const reducer = (state = initialState, action) => {
  console.log("BURGER BUILDER REDUCER:", state, action);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return { ...state, ...addIngredientHandler(state, action.payLoad.type) };
    case actionTypes.SUBTRACT_INGREDIENT:
      return {
        ...state,
        ...subtractIngredientHandler(state, action.payLoad.type),
      };
    case actionTypes.SET_INGREDIENTS:
        // set the ingredients in the order for display
        const sortOrderIngredients = {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
      };
      return {
        ...state,
        ...sortOrderIngredients,
        error: false,
        building: false // reloading the page - have not yet added any ingredients
      };
    case actionTypes.SET_TOTALPRICE:
      return { ...state, totalPrice: action.totalPrice };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default reducer;
