import * as actionTypes from "./actions";

const initialState = {
  ingredients: null,
  totalPrice: 0,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.25,
  cheese: 0.3,
  meat: 1.25,
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
  return { totalPrice: newPrice, ingredients: updatedIngredients };
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

    return { totalPrice: newPrice, ingredients: updatedIngredients };
  }
};

const reducer = (state = initialState, action) => {
  console.log("REDUCER:", state, action);
  switch (action.type) {
    case "ADD_INGREDIENT":
      return addIngredientHandler(state, action.payLoad.type);
    case actionTypes.SUBTRACT_INGREDIENT:
      return subtractIngredientHandler(state, action.payLoad.type);
    case actionTypes.SET_INGREDIENTS:
      return { ...state, ingredients: action.ingredients };
    case actionTypes.SET_TOTALPRICE:
      return { ...state, totalPrice: action.totalPrice };

    default:
      return state;
  }
};

export default reducer;
