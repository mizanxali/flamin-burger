import React from 'react'
import './Input.css'

const Input = (props) => {
    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            <input className='InputElement' {...props.elementConfig} value={props.value} onChange={props.changed} />
        </div>
    )
}

export default Input