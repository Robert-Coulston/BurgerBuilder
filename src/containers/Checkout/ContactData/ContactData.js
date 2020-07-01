import React, { Component } from "react";
import classes from "./ContactData.module.css";
import { withRouter } from "react-router";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          doesNotIncludeNumbers: true,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "",
        validation: {
          required: true,
          doesNotIncludeNumbers: true,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
          placeholder: "Your delivery method",
        },
        value: "",
        valid: true,
        touched: false,
        errorMessage: "",
      },
    },
    loading: false,
    formIsvalid: false,
  };

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
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    return {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
  };

  inputChangedHandler = (event) => {
    // Ensure that the property in state is deep copied one level at a time.
    // First copy orderForm (each field is still a reference), then deep copy field so that value is copied.
    let eventOrderForm = { ...this.state.orderForm };
    let targetField = { ...eventOrderForm[event.target.name] };
    // let targetField2 = this.state.orderForm[event.target.name];
    // let targetField3 = eventOrderForm[event.target.name];

    // console.log(
    //   "reference comparison check:",
    //   targetField === this.state.orderForm[event.target.name]
    // ); // * deep copy - will NOT be equal
    // console.log(
    //   "reference2 comparison check:",
    //   targetField2 === this.state.orderForm[event.target.name]
    // ); // shallow copy - will be equal
    // console.log(
    //   "reference3 comparison check:",
    //   targetField3 === this.state.orderForm[event.target.name]
    // ); // nested object, shallow copy - will be equal

    targetField.value = event.target.value;
    targetField.touched = true;

    const validity =
      targetField.validation && targetField.touched
        ? this.checkValidity(targetField.value, targetField.validation)
        : { isValid: true, errorMessage: "" };

    targetField.valid = validity.isValid;
    targetField.errorMessage = validity.errorMessage;

    eventOrderForm[event.target.name] = targetField;

    console.log(targetField);

    console.log("[inputChangedHandler]");
    console.log(eventOrderForm);

    const isFormValid = this.IsFormValid(eventOrderForm);
    console.log("IsFormValid", isFormValid);

    this.setState({ orderForm: eventOrderForm, formIsvalid: isFormValid });
  };

  checkValidity = (value, rules) => {
    let response = {
      isValid: true,
      errorMessage: "",
    };

    console.log(rules.required);

    if (rules.required && response.isValid) {
      response.isValid = value.trim() !== "";
      if (!response.isValid) {
        response.errorMessage = "This is a required field";
      }
    }

    if (rules.doesNotIncludeNumbers && response.isValid) {
      response.isValid = !this.hasNumber(value);
      if (!response.isValid) {
        response.errorMessage = "This field must not contain numbers";
      }
    }

    if (rules.minLength && response.isValid) {
      response.isValid = value.length >= rules.minLength;
      if (!response.isValid) {
        response.errorMessage = `This field has a minimum length of ${rules.minLength}`;
      }
    }

    if (rules.maxLength && response.isValid) {
      response.isValid = value.length <= rules.maxLength;
      if (!response.isValid) {
        response.errorMessage = `This field has a maximum length of ${rules.maxLength}`;
      }
    }

    return response;
  };

  hasNumber = (stringHasNumber) => {
    return /\d/.test(stringHasNumber);
  };

  IsFormValid = (eventOrderForm) => {
    let isFormValid = true;
    // iterate through all controls and check if one one control is not valid
    for (let formElement in eventOrderForm) {
      if (!eventOrderForm[formElement].valid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key],
        });
      }
    }

    let form = (
      <form>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementName={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e) => this.inputChangedHandler(e)}
              invalid={!formElement.config.valid}
              shouldValidate={
                formElement.config.validation && formElement.config.touched
              }
              errorMessage={formElement.config.errorMessage}
            />
          );
        })}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsvalid}
        >
          ORDER
        </Button>
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

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(withRouter(ContactData));
