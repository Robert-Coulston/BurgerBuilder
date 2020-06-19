import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <div className={classes.CheckoutSummary}>
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
