import React from "react";
import BuildControl from "./BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={(t) => props.ingredientAdded(ctrl.type)}
        subtracted={(t) => props.ingredientSubtracted(ctrl.type)}
        isDisabled={props.disabled[ctrl.type]}
      />
    ))}
  </div>
);

export default BuildControls;
