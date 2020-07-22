import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  let messageElement = null;
  if (props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
    messageElement = <p className={classes.ValidationError}>{props.errorMessage}</p>;
  }

  switch (props.elementType) {
    case "input": {
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
        />
      );
      break;
    }
    case "textarea": {
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
        />
      );
      break;
    }

    case "select": {
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          name={props.elementName}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    }

    default: {
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
        />
      );
      break;
    }
  }

  return (
    <div>
      <label>{props.elementName}</label>
      {inputElement}
      {messageElement}
    </div>
  );
};

export default Input;
