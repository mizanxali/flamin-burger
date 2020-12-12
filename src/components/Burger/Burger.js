import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {

    let transformedIngredients =
    Object.keys(props.ingredients) //returns an array of the keys of the props.ingredients object
    .map((item, _) => {
        return [...Array(props.ingredients[item])] //returns an array with the same number of elements as the number of the particular ingredient (item) in the props object
        .map((_, index) => {
            return <BurgerIngredient key={item+index} type={item} /> //returns an array of BurgerIngredient components
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    });

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients.</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredient type={'breadtop'} />
            {transformedIngredients}
            <BurgerIngredient type={'breadbottom'} />
        </div>
    )
}

export default Burger