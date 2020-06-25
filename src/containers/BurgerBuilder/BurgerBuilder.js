import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OderSummary/OrderSummary";
import axios from "../.././axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.25,
  cheese: 0.3,
  meat: 1.25,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.loadIngredients();
  }

  purchaseHandler = () => {
    const isPurchasing = true;
    this.setState({ purchasing: isPurchasing });
  };

  purchaseCancelledHandler = () => {
    const isPurchasing = false;
    this.setState({ purchasing: isPurchasing });
  };

  purchaseContinueHandler = () => {
    console.log("[purchaseContinueHandler]");
    console.log(this.props);

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
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

  BuildOrder = () => {
    return {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Robert Coulston",
        address: {
          street: "1 something street",
          postCode: "2000",
          country: "Australia",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fast",
    };
  };

  loadIngredients() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        console.log("getting ingredients");
        // calculate the total initial price
        var price = 0;
        Object.keys(response.data).forEach((key, index) => {
          price = price + INGREDIENT_PRICES[key] * response.data[key];
        });
        this.setState({ totalPrice: price, ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.state.ingredients) {
      Object.keys(this.state.ingredients).forEach((key, index) => {
        disabledInfo[key] = this.state.ingredients[key] <= 0;
      });

      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={(t) => this.addIngredientHandler(t)}
            ingredientSubtracted={(t) => this.subtractIngredientHandler(t)}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={() => this.purchaseHandler()}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelled={() => this.purchaseCancelledHandler()}
          purchased={() => this.purchaseContinueHandler()}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.purchaseCancelledHandler()}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
