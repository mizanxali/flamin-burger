import React, { Fragment } from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/'>Build a burger</NavigationItem>
            
            {props.isAuth ?
                <Fragment>
                    <NavigationItem link='/orders'>Orders</NavigationItem>
                    <NavigationItem link='/logout'>Sign Out</NavigationItem>
                </Fragment>
                :
                <NavigationItem link='/auth'>Sign In</NavigationItem>
            }
        </ul>
    );
}

export default NavigationItems