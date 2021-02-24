import router from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        payload: {
            error: error
        }
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        router.post('/orders.json', orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch(err => {
            dispatch(purchaseBurgerFailure(err))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders: orders
        }
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        payload: {
            error: error
        }
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        router.get('/orders.json')
        .then(res => {
            const retrievedOrders = [];
            for(let firebaseObjectID in res.data) {
                retrievedOrders.push({
                    ...res.data[firebaseObjectID],
                    orderID: firebaseObjectID
                });
            }
            dispatch(fetchOrdersSuccess(retrievedOrders))
        })
        .catch(err => {
            dispatch(fetchOrdersFailure(err))
        })
    }
}