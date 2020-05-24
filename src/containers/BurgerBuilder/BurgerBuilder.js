import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.25,
  cheese: 0.3,
  meat: 1.25,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const { oldPrice, priceValue, updatedIngredients } = this.setPrice(
      type,
      updatedCount
    );
    const newPrice = oldPrice + priceValue;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  subtractIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount >= 1) {
      const updatedCount = oldCount - 1;

      const { oldPrice, priceValue, updatedIngredients } = this.setPrice(
        type,
        updatedCount
      );
      const newPrice = oldPrice - priceValue;

      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }
  };

  setPrice(type, updatedCount) {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceValue = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    return { oldPrice, priceValue, updatedIngredients };
  }

  render() {
    console.log("BurgerBuilder");

    let disabledInfo = {};
    Object.keys(this.state.ingredients).forEach((key,index) =>  {
        disabledInfo[key] = this.state.ingredients[key] <= 0;
    });

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={(t) => this.addIngredientHandler(t)}
          ingredientSubtracted={(t) => this.subtractIngredientHandler(t)}
          disabled={disabledInfo}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
