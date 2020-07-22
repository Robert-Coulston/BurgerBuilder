import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import axios from "../.././axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.loadIngredients();
  }
    
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      const isPurchasing = true;
      this.setState({ purchasing: isPurchasing });
    } else {
      this.props.onSetAuthRedirectPath('/checkout'); // before redirecting to login page, set where to go to after the user logs in
      this.props.history.push('/auth');
    }
  };

  purchaseCancelledHandler = () => {
    const isPurchasing = false;
    this.setState({ purchasing: isPurchasing });
  };

  purchaseContinueHandler = () => {

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
    this.props.onPurchaseInit();
    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
  };

  loadIngredients() {
    this.props.onInitIngredients();
  }

  render() {
    let disabledInfo = {};
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded !!</p> : <Spinner />;

    if (this.props.ingredients) {
      Object.keys(this.props.ingredients).forEach((key, index) => {
        disabledInfo[key] = this.props.ingredients[key] <= 0;
      });

      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            isAuthenticated={this.props.isAuthenticated}
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
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientType) =>
      dispatch(actionCreators.addIngredient(ingredientType)),
    onSubtractIngredient: (ingredientType) =>
      dispatch(actionCreators.subtractIngredient(ingredientType)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
