import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import CustomerData from './CustomerData/CustomerData'
import { connect } from 'react-redux'

class Checkout extends Component {
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('checkout/cust-data');
    }
    
    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} checkoutCanceled={this.checkoutCanceledHandler} checkoutConfirmed={this.checkoutConfirmedHandler} />
                <Route path={this.props.match.url + '/cust-data'} component={CustomerData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)