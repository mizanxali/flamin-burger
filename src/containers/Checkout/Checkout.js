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
    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout