import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {
            cheese: 1,
            lettuce: 1,
            meat: 1,
            tomato: 1
        }
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of queryParams.entries()) {
            //param = ['ingredient-name', 'quantity']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('checkout/customer-data');
    }
    
    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCanceled={this.checkoutCanceledHandler} checkoutConfirmed={this.checkoutConfirmedHandler} />
            </div>
        )
    }
}

export default Checkout