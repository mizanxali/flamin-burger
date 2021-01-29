import * as actionTypes from './actions'

const INGREDIENT_PRICES = {
    cheese : 4.99,
    lettuce : 1.99,
    meat : 7.49,
    tomato : 2.49  
}

const initialState = {
    ingredients: {
        cheese: 0,
        lettuce: 0,
        tomato: 0,
        meat: 0
    },
    totalAmount: 2.49
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientToAdd]: state.ingredients[action.payload.ingredientToAdd] + 1
                },
                totalAmount: state.totalAmount + INGREDIENT_PRICES[action.payload.ingredientToAdd]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientToRemove]: state.ingredients[action.payload.ingredientToRemove] - 1
                },
                totalAmount: state.totalAmount - INGREDIENT_PRICES[action.payload.ingredientToRemove]
            }
        default:
            return state
    }
}

export default reducer