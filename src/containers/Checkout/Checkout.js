import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import CustomerData from './CustomerData/CustomerData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalAmount: 0
    }

    componentWillMount() {
        console.log(this.props);
        const queryParams = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let totalAmount = null;
        for (let param of queryParams.entries()) {
            //param = ['ingredient-name', 'quantity']
            if(param[0]==='totalAmount') {
                totalAmount = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalAmount: totalAmount});
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('checkout/cust-data');
    }
    
    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCanceled={this.checkoutCanceledHandler} checkoutConfirmed={this.checkoutConfirmedHandler} />
                <Route path={this.props.match.url + '/cust-data'} render={() => (<CustomerData ingredients={this.state.ingredients} totalAmount={this.state.totalAmount} />)} />
            </div>
        )
    }
}

export default Checkout