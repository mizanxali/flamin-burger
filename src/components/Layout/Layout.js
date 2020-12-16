import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSideDrawer: false
        }
    }

    sideDrawerClosedHandler =  () => {
        this.setState({
            showSideDrawer: false
        });
    }

    drawerToggledHandler = () => {
        this.setState({
            showSideDrawer: true
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar drawerToggled={this.drawerToggledHandler} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} sideDrawerClosed={this.sideDrawerClosedHandler} />
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout