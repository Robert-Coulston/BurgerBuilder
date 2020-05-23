import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 2,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }

    render() {
        console.log("BurgerBuilder");

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Fragment>
        )
    };
}

export default BurgerBuilder;
