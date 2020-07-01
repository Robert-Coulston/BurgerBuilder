import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OderSummary/OrderSummary";
import axios from "../.././axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.25,
  cheese: 0.3,
  meat: 1.25,
};

class BurgerBuilder extends Component {
  state = {
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

    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.props.totalPrice);

    // const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout"
      // search: "?" + queryString,
    });
  };

  BuildOrder = () => {
    return {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
        console.log(response.data);
        
        this.props.onSetIngredients(response.data);
        this.props.onSetTotalPrice(price);
        // this.setState({ totalPrice: price, ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    console.log("BurgerBuilder");
    console.log(this.props.ingredients, this.props.totalPrice);

    let disabledInfo = {};
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.props.ingredients) {
      Object.keys(this.props.ingredients).forEach((key, index) => {
        disabledInfo[key] = this.props.ingredients[key] <= 0;
      });

      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={(t) => this.props.onAddIngredient(t)}
            ingredientSubtracted={(t) => this.props.onSubtractIngredient(t)}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            ordered={() => this.purchaseHandler()}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelled={() => this.purchaseCancelledHandler()}
          purchased={() => this.purchaseContinueHandler()}
          price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps", dispatch);
  return {
    onAddIngredient: (ingredientType) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payLoad: { type: ingredientType },
      }),
    onSubtractIngredient: (ingredientType) =>
      dispatch({
        type: actionTypes.SUBTRACT_INGREDIENT,
        payLoad: { type: ingredientType },
      }),
    onSetIngredients: (ingredients) =>
      dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: ingredients }),
    onSetTotalPrice: (totalPrice) =>
      dispatch({ type: actionTypes.SET_TOTALPRICE, totalPrice: totalPrice }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
