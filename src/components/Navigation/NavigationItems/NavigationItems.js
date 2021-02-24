import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/'>Build a burger</NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            <NavigationItem link='/auth'>Auth</NavigationItem>
        </ul>
    );
}

export default NavigationItems