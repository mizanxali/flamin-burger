import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {ingredientLabel: 'Lettuce', type: 'lettuce', ingredientPrice: "1.99"},
    {ingredientLabel: 'Tomato', type: 'tomato', ingredientPrice: "2.50"},
    {ingredientLabel: 'Cheese', type: 'cheese', ingredientPrice: "5.00"},
    {ingredientLabel: 'Meat', type: 'meat', ingredientPrice: "7.50"}
];

const BuildControls = (props) => {
    return (
        <div className="BuildControls">
            {controls.map((item) => (
                <BuildControl key={item.ingredientLabel} ingredientLabel={item.ingredientLabel} ingredientPrice={item.ingredientPrice} />
            ))}
        </div>
    );
}

export default BuildControls