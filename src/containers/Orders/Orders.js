import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios.get("/orders.json").then((response) => {
      const orderData = [];
      for (let key in response.data) {
        orderData.push({ ...response.data[key], id: key });
      }
      console.log(orderData);
      this.setState({ orders: orderData, loading: false });
    })
    .catch(err => {
        this.setState({loading:false})
    });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
