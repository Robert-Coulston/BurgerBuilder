import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map( (igKey) => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button clicked={()=> props.cancelled()} btnType={"Danger"}>CANCEL</Button>
            <Button clicked={()=> props.purchased()} btnType={"Success"}>CONTINUE</Button>

        </Fragment>
    )
};

export default OrderSummary
