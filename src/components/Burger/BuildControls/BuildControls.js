import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {ingredientLabel: 'Lettuce', type: 'lettuce', ingredientPrice: "1.99"},
    {ingredientLabel: 'Tomato', type: 'tomato', ingredientPrice: "2.49"},
    {ingredientLabel: 'Cheese', type: 'cheese', ingredientPrice: "4.99"},
    {ingredientLabel: 'Meat', type: 'meat', ingredientPrice: "7.49"}
];

const BuildControls = (props) => {
    return (
        <div className="BuildControls">
            <h1>Total: ${props.totalAmount.toFixed(2)}</h1>
            {controls.map((item) => (
                <BuildControl
                addIngredient={() => props.addIngredient(item.type)}
                removeIngredient={() => props.removeIngredient(item.type)}
                key={item.ingredientLabel} //since label is unique, it can be used as a key
                ingredientLabel={item.ingredientLabel}
                ingredientPrice={item.ingredientPrice}
                disabled={props.disabled[item.type]} />
            ))}
            <button disabled={!props.purchaseable} className="OrderButton" onClick={props.purchasingClicked}>ORDER</button>
        </div>
    );
}

export default BuildControls