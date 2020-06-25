import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, withRouter } from "react-router";
import ContactData from "./ContactData/ContactData";
// import axios from 'axios';

class Checkout extends Component {
  state = {
    // temporary list of ordered ingredients
    ingredients: null,
    price: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] !== "price") {
        ingredients[param[0]] = +param[1];
      } else {
        price = +param[1];
      }
    }

    
    console.log("checkout componentDidMount", ingredients);
    this.setState({ ingredients: ingredients });
    this.setState({ price: price });
  }
  checkoutCancelledHandler = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    console.log("checkoutContinuedHandler", this.props);

    this.props.history.replace(this.props.match.url + "/contact-data");
  };

  render() {
    console.log("Checkout");
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={() => this.checkoutCancelledHandler()}
          checkoutContinued={() => this.checkoutContinuedHandler()}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          exact
          render={() => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.price}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(Checkout);
