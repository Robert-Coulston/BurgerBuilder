import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, withRouter, Redirect } from "react-router";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";


class Checkout extends Component {
  
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

    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={() => this.checkoutCancelledHandler()}
            checkoutContinued={() => this.checkoutContinuedHandler()}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            exact
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased

  };
};




export default connect(mapStateToProps)(withRouter(Checkout));
