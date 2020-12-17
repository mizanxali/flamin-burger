import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients) //map the ingredients object into list items
    .map((item) => {
        return <li key={item}><span style={{textTransform: 'capitalize'}}>{item}</span>: {props.ingredients[item]}</li>
    });

    return (
        <Aux>
            <h1>Your Burger</h1>
            <ul>
                {ingredientSummary}
            </ul>
            <h2>Grand total: ${props.grandTotal.toFixed(2)}</h2>
            <p>Continue to checkout?</p>
            <Button buttonType='Success' buttonClicked={props.purchaseConfirmed}>YES</Button>
            <Button buttonType='Danger' buttonClicked={props.purchaseCanceled}>NO</Button>
        </Aux>
    );
}

export default OrderSummary