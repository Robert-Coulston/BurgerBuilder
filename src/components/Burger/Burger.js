import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const Burger = (props) => {

    // array of named ingredients
    const constituents = Object.keys(props.ingredients);

    //Array(props.ingredients[igKey]) => how many of an ingredient is requested
    const transformedIngredients = constituents
        .map( igKey => {return [...Array(props.ingredients[igKey])]
            .map( (x, i) => (<BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>) )    
        });
    return (
        <div className={classes.Burger}> 
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;