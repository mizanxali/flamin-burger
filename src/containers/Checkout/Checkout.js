import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
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
        let summary = <Redirect to='/' />
        
        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ingredients} checkoutCanceled={this.checkoutCanceledHandler} checkoutConfirmed={this.checkoutConfirmedHandler} />
                <Route path={this.props.match.url + '/cust-data'} component={CustomerData} />
                </div>)
        }
        return summary
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)