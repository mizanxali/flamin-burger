import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/' active>Build a burger</NavigationItem>
            <NavigationItem link='/'>Check out</NavigationItem>
            <NavigationItem link='/'>Past orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems