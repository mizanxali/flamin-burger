import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
                <BuildControls></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder