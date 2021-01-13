import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import router from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

let ingredientPrices = null;

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalAmount: 2.49,
            purchaseable: false,
            purchasing: false,
            isLoading: false,
            error: null
        };
    }

    componentDidMount() {
        router.get('https://burger-king-ed0a0-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients: res.data});
        })
        .catch(err => {
            this.setState({error: true});
        });

        router.get('https://burger-king-ed0a0-default-rtdb.firebaseio.com/ingredient-prices.json')
        .then(res => {
            ingredientPrices = res.data;
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const addedAmount = ingredientPrices[type];
        const oldAmount = this.state.totalAmount
        const newAmount = oldAmount  + addedAmount;

        this.setState({ingredients: updatedIngredients, totalAmount: newAmount});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0) {
            return; //do nothing
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const reducedAmount = ingredientPrices[type];
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

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseConfirmedHandler = () => {
        // alert('OK');

        const queryParams = [];

        for (let item in this.state.ingredients) {
            queryParams.push(encodeURIComponent(item) + '=' + encodeURIComponent(this.state.ingredients[item]));
        }
        
        queryParams.push('totalAmount=' + this.state.totalAmount);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    }

    render() {
        const disabledInfo = { //a new object which is same as this.state.ingredients but all values are true or false depending on 0 or not
            ...this.state.ingredients
        };
        for(let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0 //returns boolean and overwrites the numeric value
        }

        let modalContent = null;
        let burgerStuff = this.state.error ? <p style={{textAlign: 'center'}}>Oops! Could not load ingredients.</p> : <Spinner />

        if(this.state.ingredients) {
            burgerStuff = 
                <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasingClicked={this.purchasingHandler}
                purchaseable={this.state.purchaseable}
                totalAmount={this.state.totalAmount} />
                </Aux>
            modalContent = <OrderSummary grandTotal={this.state.totalAmount} ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCanceledHandler} purchaseConfirmed={this.purchaseConfirmedHandler} />
        }

        if(this.state.isLoading) {
            modalContent = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    {modalContent}
                </Modal>
                {burgerStuff}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, router);