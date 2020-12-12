import React from 'react'
import './Button.css'

const Button = (props) => {
    return (
        <button onClick={props.buttonClicked} className={["Button", props.buttonType].join(' ')}>{props.children}</button>
    );
}

export default Button