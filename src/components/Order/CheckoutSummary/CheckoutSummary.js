import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    return (
        <div className='CheckoutSummary'>
            <h1>Enjoy your burger!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button buttonType='Danger' buttonClicked={props.checkoutCanceled}>CANCEL</Button>
            <Button buttonType='Success' buttonClicked={props.checkoutConfirmed}>ORDER</Button>
        </div>
    );
}

export default CheckoutSummary