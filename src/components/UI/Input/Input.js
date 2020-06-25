import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;

  console.log("[Input]", props);

  switch (props.elementType) {
    case "input": {
      inputElement = (
        <input
          onChange={props.changed}
          className={classes.InputElement}
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
          className={classes.InputElement}
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
          className={classes.InputElement}
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
          className={classes.InputElement}
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
    </div>
  );
};

export default Input;
