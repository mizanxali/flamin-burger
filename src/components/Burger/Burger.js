import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    return (
        <div className="Burger">
            <BurgerIngredient type={'bread-top'} />
            <BurgerIngredient type={'salad'} />
            <BurgerIngredient type={'cheese'} />
            <BurgerIngredient type={'bacon'} />
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    )
}

export default Burger