import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import './CustomerData.css'
import router from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router'
import Input from '../../../components/UI/Input/Input'

class CustomerData extends Component {
    state = {
        orderForm: {
            name: {
                label: 'Name',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "Sherlock Holmes"
                }
            },
            phoneNumber: {
                label: 'Phone Number',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "1234567"
                }
            },
            email: {
                label: 'Email',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "sh@thescienceofdeduction.com"
                }
            },
            
            street: {
                label: 'Street Address',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "221B Baker Street, London"
                }
            },
            zipcode: {
                label: 'Zip Code',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "NW1"
                }
            }
        },
        isLoading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //to stop button from reloading the page on being clicked
        this.setState({isLoading: true});
        const customerData = {}
        for(let key in this.state.orderForm) {
            customerData[key] = this.state.orderForm[key].value
        }
        const finalOrder = {
            ingredients: this.props.ingredients,
            totalAmount: this.props.totalAmount,
            customerData: customerData
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

    inputChangedHandler = (event, inputElement) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputElement]
        }
        updatedOrderFormElement.value = event.target.value
        updatedOrderForm[inputElement] = updatedOrderFormElement
        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render() {
        const formElementsArray = []

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                setup: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((item) => {
                    return <Input key={item.id} label={item.setup.label} value={item.setup.value} elementConfig={item.setup.elementConfig} changed={(event) => this.inputChangedHandler(event, item.id)} />
                })}
                <Button buttonType='Success'>ORDER</Button>
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