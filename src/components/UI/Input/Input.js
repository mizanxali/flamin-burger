import React from 'react'
import './Input.css'

const Input = (props) => {
    const inputClasses = ['InputElement']
    let validationError = null

    if(!props.isValid && props.isTouched) {
        inputClasses.push('Invalid')
        validationError = <p className='ValidationError'>Please enter a valid value!</p>
    }

    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            {validationError}
        </div>
    )
}

export default Input