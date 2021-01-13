import React, { Component } from 'react'
import router from '../../axios-orders';
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class OrderHistory extends Component {
    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount() {
        router.get('/orders.json')
        .then(res => {
            const retrievedOrders = [];
            for(let firebaseObjectID in res.data) {
                retrievedOrders.push({
                    ...res.data[firebaseObjectID],
                    orderID: firebaseObjectID
                });
            }
            this.setState({isLoading: false, orders: retrievedOrders});
        })
        .catch(err => {
            this.setState({isLoading: false})
        })
    }
    render() {
        return(
            <div>
                {this.state.orders.map(order => {
                    return <Order key={order.orderID} ingredients={order.ingredients} totalAmount={order.totalAmount} />
                })}
            </div>
        );
    }
}

export default withErrorHandler(OrderHistory, router)