import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onfetchOrders(this.props.token, this.props.userId);
  }

  render() {
    if (this.props.error) {
      return <p>Orders cannot be loaded !!</p>;
    }

    let ordersDisplay = null;

    if (this.props.loading) {
      ordersDisplay = <Spinner />;
    } else {
      ordersDisplay = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }

    return ordersDisplay;
  }
}

const mapStateToProps = (state) => {
  console.log("ORDERS and AUTH mapStateToProps", state);
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId
  };
};


const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps", dispatch);
  return {
    onfetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
