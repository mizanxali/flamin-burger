import React from 'react'
import './BuildControl.css'

const BuildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className='Label'>{props.ingredientLabel}</div>
            <button className='Less'>Less</button>
            <button className='More'>More</button>
            <div className='Label'>${props.ingredientPrice}</div>
        </div>
    );
}

export default BuildControl