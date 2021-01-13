import React from 'react'
import './Order.css'

const Order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '10px'}} key={ingredient.name}>{ingredient.name} ({ingredient.quantity}) </span>
    })

    return (
        <div className='Order'>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Amount: ${Number.parseFloat(props.totalAmount).toFixed(2)}</p>
        </div>
    );
}

export default Order