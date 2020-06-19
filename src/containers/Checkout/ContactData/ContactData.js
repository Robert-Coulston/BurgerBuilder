import React, { Component } from "react";
import classes from "./ContactData.module.css";
import { withRouter } from "react-router";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log("[ContactData]");
    console.log(this.props);

    const order = this.BuildOrder();

    let isLoading = true;
    this.setState({ loading: isLoading });
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        //Simulate taking some time to place order
        setTimeout(() => {
          isLoading = false;
          this.setState({ loading: isLoading });

          this.props.history.push({
            pathname: "/"
          });
          //   this.loadIngredients();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        isLoading = false;
        this.setState({ loading: isLoading });
      });
  };

  BuildOrder = () => {
    return {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     console.log("getting ingredients");
    //     // calculate the total initial price
    //     var price = 0;
    //     Object.keys(response.data).forEach((key, index) => {
    //       price = price + INGREDIENT_PRICES[key] * response.data[key];
    //     });
    //     this.setState({ totalPrice: price, ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Your postcode"
        />
        <button onClick={(e) => this.orderHandler(e)}>ORDER</button>
      </form>
    );

    if (this.state.loading) {
        form = <Spinner/>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
