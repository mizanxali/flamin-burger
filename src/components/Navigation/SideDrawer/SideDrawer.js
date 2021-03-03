import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const SideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if(props.showSideDrawer) {
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <Aux>
            <Backdrop show={props.showSideDrawer} backdropClicked={props.sideDrawerClosed} />
            <div className={attachedClasses.join(' ')} onClick={props.sideDrawerClosed}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer