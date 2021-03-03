import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
    return (
        <header className='Toolbar'>
            <DrawerToggle clicked={props.drawerToggled} />
            <Logo height="80%" />
            <nav className="DesktopOnly">
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    );
}

export default Toolbar