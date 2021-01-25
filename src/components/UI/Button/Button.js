import React from 'react'
import './Button.css'

const Button = (props) => {
    return (
        <button disabled={props.disabled} onClick={props.buttonClicked} className={["Button", props.buttonType].join(' ')}>{props.children}</button>
    );
}

export default Button