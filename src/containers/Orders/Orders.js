import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onfetchOrders();
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
  console.log("ORDERS mapStateToProps", state);
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps", dispatch);
  return {
    onfetchOrders: () => dispatch(actionCreators.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
