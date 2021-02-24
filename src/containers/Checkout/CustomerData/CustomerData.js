import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import './CustomerData.css'
import router from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'

class CustomerData extends Component {
    state = {
        orderForm: {
            name: {
                label: 'Name',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "Sherlock Holmes"
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            phoneNumber: {
                label: 'Phone Number',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "1234567"
                },
                validation: {
                    required: true,
                    minLength: 10
                },
                isValid: false,
                isTouched: false
            },
            email: {
                label: 'Email',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "sh@thescienceofdeduction.com"
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            street: {
                label: 'Street Address',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "221B Baker Street, London"
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            zipcode: {
                label: 'Zip Code',
                value: '',
                elementConfig: {
                    type: "text",
                    placeholder: "NW1"
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            }
        },
        isFormValid: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //to stop button from reloading the page on being clicked
        const customerData = {}
        for(let key in this.state.orderForm) {
            customerData[key] = this.state.orderForm[key].value
        }
        const finalOrder = {
            ingredients: this.props.ingredients,
            totalAmount: this.props.totalAmount,
            customerData: customerData
        }
        this.props.onPurchaseBurger(finalOrder)
    }

    checkValidation = (value, rules) => {
        let isValid = true
        if(rules.required) {
            isValid = value.trim() !== '' && isValid //isValid will be true if value without whitespaces is not an empty string and if it was already true (not set to false by any preceding checks)
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, inputElement) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputElement]
        }
        updatedOrderFormElement.value = event.target.value
        updatedOrderFormElement.isValid = this.checkValidation(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.isTouched = true
        updatedOrderForm[inputElement] = updatedOrderFormElement

        let isFormValid = true
        for(let item in updatedOrderForm) {
            isFormValid = updatedOrderForm[item].isValid && isFormValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid
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
                    return <Input key={item.id} label={item.setup.label} value={item.setup.value} elementConfig={item.setup.elementConfig} changed={(event) => this.inputChangedHandler(event, item.id)} isTouched={item.setup.isTouched} isValid={item.setup.isValid} />
                })}
                <Button disabled={!this.state.isFormValid} buttonType='Success'>ORDER</Button>
            </form>
        );

        if(this.props.loading) {
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalAmount: state.burgerBuilder.totalAmount,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CustomerData, router))