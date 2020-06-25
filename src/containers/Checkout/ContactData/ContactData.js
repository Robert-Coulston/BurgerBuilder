import React, { Component } from "react";
import classes from "./ContactData.module.css";
import { withRouter } from "react-router";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { isElement } from "react-dom/test-utils";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street"
        },
        value: "",
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postcode"
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country"
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value:'fastest', displayValue:'Fastest'},
            { value:'cheapest', displayValue:'Cheapest'}
          ],
          placeholder: "Your delivery method"
        },
        value: "",
      },
    },
    loading: false,
  };
// should this line be here
  componendDidMount() {
    console.log("[ContactData] componendDidMount");
  }

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
            pathname: "/",
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        isLoading = false;
        this.setState({ loading: isLoading });
      });
  };

  BuildOrder = () => {
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    return {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
  };

  inputChangedHandler = (event) => {

    // Ensure that the property in state is deep copied one level at a time. 
    // First copy orderForm (each field is still a reference), then deep copy field so that value is copied.
    let eventOrderForm = {...this.state.orderForm};
    let targetField = {...eventOrderForm[event.target.name]};
    let targetField2 = this.state.orderForm[event.target.name];
    let targetField3 = eventOrderForm[event.target.name];
    
    console.log("reference comparison check:", targetField === this.state.orderForm[event.target.name]) // * deep copy - will NOT be equal
    console.log("reference2 comparison check:", targetField2 === this.state.orderForm[event.target.name]) // shallow copy - will be equal
    console.log("reference3 comparison check:", targetField3 === this.state.orderForm[event.target.name]) // nested object, shallow copy - will be equal

    targetField.value = event.target.value;
    eventOrderForm[event.target.name] = targetField;
    
    console.log("[inputChangedHandler]");
    console.log(eventOrderForm);    

    this.setState({orderForm:eventOrderForm});
  }
  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElementsArray.push({
          id:key,
          config: this.state.orderForm[key]
        });
      }
    }

    let form = (
      <form>
      { formElementsArray.map((formElement) => {
        return <Input
          key={formElement.id}
          elementName={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => this.inputChangedHandler(e)}
        />
      })}
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
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
