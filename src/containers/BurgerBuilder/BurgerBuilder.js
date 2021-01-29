import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import router from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

// let ingredientPrices = null;

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            isLoading: false,
            error: null
        };
    }

    componentDidMount() {
        // router.get('https://burger-king-ed0a0-default-rtdb.firebaseio.com/ingredients.json')
        // .then(res => {
        //     this.setState({ingredients: res.data});
        // })
        // .catch(err => {
        //     this.setState({error: true});
        // });

        // router.get('https://burger-king-ed0a0-default-rtdb.firebaseio.com/ingredient-prices.json')
        // .then(res => {
        //     ingredientPrices = res.data;
        // })
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
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = { //a new object which is same as this.props.ingredients but all values are true or false depending on 0 or not
            ...this.props.ingredients
        };
        for(let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0 //returns boolean and overwrites the numeric value
        }

        let modalContent = null;
        let burgerStuff = this.state.error ? <p style={{textAlign: 'center'}}>Oops! Could not load ingredients.</p> : <Spinner />

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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalAmount: state.totalAmount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, payload: {ingredientToAdd: ingredientName}}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, payload: {ingredientToRemove: ingredientName}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, router))