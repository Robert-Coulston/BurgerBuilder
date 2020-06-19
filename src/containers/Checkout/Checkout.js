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

    // const order = this.BuildOrder();

    // let isLoading = true;
    // this.setState({ loading: isLoading });
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     console.log(response);
    //     //Simulate taking some time to place order
    //     setTimeout(() => {
    //       isLoading = false;
    //       this.setState({ loading: isLoading });
    //       const isPurchasing = false;
    //       this.setState({ purchasing: isPurchasing });
    //       this.loadIngredients();
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     isLoading = false;
    //     this.setState({ loading: isLoading });
    //     const isPurchasing = false;
    //     this.setState({ purchasing: isPurchasing });
    //   });
  };

  //   BuildOrder = () => {
  //     return {
  //       ingredients: this.state.ingredients,
  //       price: this.state.price,
  //       customer: {
  //         name: "Robert Coulston",
  //         address: {
  //           street: "1 something street",
  //           postCode: "2000",
  //           country: "Australia",
  //         },
  //         email: "test@test.com",
  //       },
  //       deliveryMethod: "fast",
  //     };
  //   };

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
