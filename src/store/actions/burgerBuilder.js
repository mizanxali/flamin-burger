import router from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {ingredients: ingredients}
    }
}

export const fetchIngredientsFailed = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => { 
        router.get('https://burger-king-ed0a0-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data))
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed())
        });
    }
}

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {ingredientToAdd: ingredientName}
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {ingredientToRemove: ingredientName}
    }
}
