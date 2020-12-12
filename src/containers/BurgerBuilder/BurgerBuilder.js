import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary'

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                lettuce: 0,
                tomato: 0,
                cheese: 0,
                meat: 0
            }
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder