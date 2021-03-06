import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import router from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

// let ingredientPrices = null;

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false
        };
    }

    componentDidMount() {
        this.props.onIngredientsInit()
    }

    isBurgerPurchaseable(updatedIngredients) {
        const sumOfIngredients = Object.keys(updatedIngredients)
        .map((item, index) => {
            return updatedIngredients[item];
        }).reduce((sum, el) => {
            return sum+el;
        }, 0);

        return sumOfIngredients>0; //return true if sum>0 i.e. there is at least one ingredient
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseConfirmedHandler = () => {
        this.props.onPurchaseInit()
        this.props.history.push('checkout')
    }

    render() {
        const disabledInfo = { //a new object which is same as this.props.ingredients but all values are true or false depending on 0 or not
            ...this.props.ingredients
        };
        for(let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0 //returns boolean and overwrites the numeric value
        }

        let modalContent = null;
        let burgerStuff = this.props.error ? <p style={{textAlign: 'center'}}>Oops! Could not load ingredients.</p> : <Spinner />

        if(this.props.ingredients) {
            burgerStuff = 
                <Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls
                addIngredient={this.props.onIngredientAdded}
                removeIngredient={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchasingClicked={this.purchasingHandler}
                purchaseable={this.isBurgerPurchaseable(this.props.ingredients)}
                totalAmount={this.props.totalAmount} />
                </Aux>
            modalContent = <OrderSummary grandTotal={this.props.totalAmount} ingredients={this.props.ingredients} purchaseCanceled={this.purchaseCanceledHandler} purchaseConfirmed={this.purchaseConfirmedHandler} />
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalAmount: state.burgerBuilder.totalAmount,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsInit: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, router))