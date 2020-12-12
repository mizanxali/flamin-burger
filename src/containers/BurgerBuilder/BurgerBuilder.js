import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    lettuce: 1.99,
    tomato: 2.49,
    cheese: 4.99,
    meat: 7.49
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                lettuce: 0,
                tomato: 0,
                cheese: 0,
                meat: 0
            },
            totalAmount: 2.49,
            purchaseable: false
        };
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const addedAmount = INGREDIENT_PRICES[type];
        const oldAmount = this.state.totalAmount
        const newAmount = oldAmount  + addedAmount;

        this.setState({ingredients: updatedIngredients, totalAmount: newAmount});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const reducedAmount = INGREDIENT_PRICES[type];
        const oldAmount = this.state.totalAmount
        const newAmount = oldAmount  - reducedAmount;

        this.setState({ingredients: updatedIngredients, totalAmount: newAmount});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(updatedIngredients) {
        const sumOfIngredients = Object.keys(updatedIngredients)
        .map((item, index) => {
            return updatedIngredients[item];
        }).reduce((sum, el) => {
            return sum+el;
        }, 0);

        this.setState({purchaseable: sumOfIngredients>0}); //purchaseable is true if sum>0 i.e. there is at least one ingredient
    }

    render() {
        const disabledInfo = { //a new object which is same as this.state.ingredients but all values are true or false depending on 0 or not
            ...this.state.ingredients
        };
        for(let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0 //returns boolean and overwrites the numeric value
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                totalAmount={this.state.totalAmount} />
            </Aux>
        );
    }
}

export default BurgerBuilder