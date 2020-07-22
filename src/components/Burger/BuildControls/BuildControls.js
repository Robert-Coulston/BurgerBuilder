import React from "react";
import BuildControl from "./BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  const canOrder = props.price > 0;
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:{" "}
        <span className={classes.currentPrice}>{props.price.toFixed(2)}</span>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={(t) => props.ingredientAdded(ctrl.type)}
          subtracted={(t) => props.ingredientSubtracted(ctrl.type)}
          isDisabled={props.disabled[ctrl.type]}
        />
      ))}
      <button disabled={!canOrder} className={classes.OrderButton} onClick={props.ordered}>
        {props.isAuthenticated ? 'ORDER NOW' : 'LOGIN TO ORDER'}
      </button>
    </div>
  );
};

export default BuildControls;
