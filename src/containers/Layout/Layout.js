import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css'
import { connect } from 'react-redux'

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
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggled={this.drawerToggledHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} showSideDrawer={this.state.showSideDrawer} sideDrawerClosed={this.sideDrawerClosedHandler} />
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout)