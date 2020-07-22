import React, { Component } from "react";
import Layout from "../src/hoc/Layout/Layout";
import "./App.css";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout";
import * as actionCreators from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            {this.props.isAuthenticated && <Route path="/logout" component={Logout} />}
            {this.props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {this.props.isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route path="/" exact component={BurgerBuilder} />
            {/* Last line of defence - just redirect to home page */}
            <Redirect to="/"/> 
          </Switch>
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actionCreators.authCheckState()),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
