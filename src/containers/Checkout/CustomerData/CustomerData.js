import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import './CustomerData.css'
import router from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router';

class CustomerData extends Component {
    state = {
        name: 'John Doe',
        address: {
            street: '221B Baker Street, London',
            zipcode: '401107'
        },
        phoneNumber: '1234567',
        email: 'johndoe@example.com',
        isLoading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //to stop button from reloading the page on being clicked
        this.setState({isLoading: true});
        const finalOrder = {
            ingredients: this.props.ingredients,
            totalAmount: this.props.totalAmount,
            customer: {
                name: 'Mizan',
                address: {
                    street: '221B Baker Street',
                    zipcode: '401107'
                },
                phoneNumber: '1234567',
                email: 'johndoe@example.com'
            }
        }
        //send the finalOrder object to our Firebase database
        router.post('/orders.json', finalOrder)
        .then(res => {
            console.log(res);
            this.setState({isLoading: false});
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    }

    render() {
        let form = (
            <form>
                    <label htmlFor='name'>Name</label>
                    <input id='name' type='text' name='name' placeholder='John Doe' />
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' name='email' placeholder='johndoe@example.com' />
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input id='phoneNumber' type='text' name='phoneNumber' placeholder='1234567' />
                    <label htmlFor='street'>Street Address</label>
                    <input id='street' type='text' name='street' placeholder='221B Baker Street' />
                    <label htmlFor='zipcode'>Zip Code</label>
                    <input id='zipcode' type='text' name='zipcode' placeholder='401107' />
                    <Button buttonType='Success' buttonClicked={this.orderHandler}>ORDER</Button>
                </form>
        );

        if(this.state.isLoading) {
            form = <Spinner />
        }

        return(
            <div className='CustomerData'>
                <h4>Please enter your data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(CustomerData)