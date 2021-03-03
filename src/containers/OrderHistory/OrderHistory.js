import React, { Component } from 'react'
import router from '../../axios-orders';
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

class OrderHistory extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = (
                this.props.orders.map(order => {
                    return <Order key={order.orderID} ingredients={order.ingredients} totalAmount={order.totalAmount} />
                })
            )
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderHistory, router))