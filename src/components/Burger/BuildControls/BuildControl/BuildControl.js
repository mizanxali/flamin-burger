import React from 'react'
import './BuildControl.css'

const BuildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className='Label'>{props.ingredientLabel}</div>
            <button className='Less' onClick={props.removeIngredient} disabled={props.disabled}>Less</button>
            <button className='More' onClick={props.addIngredient}>More</button>
            <div className='Label'>${props.ingredientPrice}</div>
        </div>
    );
}

export default BuildControl