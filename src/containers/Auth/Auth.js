import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: true,
        touched: false,
        errorMessage: "",
      },
    },
    formIsvalid: false,
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  inputChangedHandler = (event) => {
    // Ensure that the property in state is deep copied one level at a time.
    // First copy authForm (each field is still a reference), then deep copy field so that value is copied.
    let authForm = { ...this.state.controls };
    let targetField = { ...authForm[event.target.name] };
    targetField.value = event.target.value;
    targetField.touched = true;

    const validity =
      targetField.validation && targetField.touched
        ? this.checkValidity(targetField.value, targetField.validation)
        : { isValid: true, errorMessage: "" };

    targetField.valid = validity.isValid;
    targetField.errorMessage = validity.errorMessage;

    authForm[event.target.name] = targetField;
    const isFormValid = this.IsFormValid(authForm);
    this.setState({ controls: authForm, formIsvalid: isFormValid });
    this.props.onKeyInput();
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

  IsFormValid = (eventAuthForm) => {
    let isFormValid = true;
    // iterate through all controls and check if one one control is not valid
    for (let formElement in eventAuthForm) {
      if (!eventAuthForm[formElement].valid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log("[AuthData]");
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchToSignInHandler = (e) => {};

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    console.log("Auth");

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath}/>
    }

    const formElementsArray = [];
    for (const key in this.state.controls) {
      if (this.state.controls.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key],
        });
      }
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementName={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(e) => this.inputChangedHandler(e)}
        invalid={!formElement.config.valid || this.props.submitErrorMessage}
        shouldValidate={
          formElement.config.validation && formElement.config.touched
        }
        errorMessage={formElement.config.errorMessage}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    const summaryValidation = this.props.submitErrorMessage ? (
      <div className={classes.validationSummary}>
        {this.props.submitErrorMessage.message}
      </div>
    ) : (
      ""
    );

    return (
      <div className={classes.AuthData}>
        <div className={classes.AuthHeading}>
          {this.state.isSignUp ? "REGISTER" : "SIGN IN"}
        </div>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsvalid}>
            SUBMIT
          </Button>
          {summaryValidation}
        </form>
        <Button btnType="Success" clicked={() => this.switchAuthModeHandler()}>
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "REGISTER"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  return {
    loading: state.auth.loading,
    submitErrorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
    onKeyInput: () => dispatch(actionCreators.authKeyInput()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
