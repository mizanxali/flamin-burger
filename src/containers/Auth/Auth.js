import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import './Auth.css'

class Auth extends Component {
    state = {
        controls: {
            email: {
                label: 'Email',
                value: '',
                elementConfig: {
                    type: "email",
                    placeholder: "sh@thescienceofdeduction.com"
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            password: {
                label: 'Password',
                value: '',
                elementConfig: {
                    type: "password",
                    placeholder: "I AM SHER LOCKED"
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                isTouched: false
            }
        },
        isSignUp: true
        // isFormValid: false
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls
        }
        const updatedControlName = {
            ...updatedControls[controlName]
        }
        updatedControlName.value = event.target.value
        updatedControlName.isValid = this.checkValidation(updatedControlName.value, updatedControlName.validation)
        updatedControlName.isTouched = true
        updatedControls[controlName] = updatedControlName

        // let isFormValid = true
        // for(let item in updatedControls) {
        //     isFormValid = updatedControls[item].isValid && isFormValid
        // }

        this.setState({
            controls: updatedControls
            // isFormValid: isFormValid
        })
    }

    authHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formElementsArray = []

        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                setup: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(item => {
            return <Input key={item.id} label={item.setup.label} value={item.setup.value} elementConfig={item.setup.elementConfig} changed={(event) => this.inputChangedHandler(event, item.id)} isTouched={item.setup.isTouched} isValid={item.setup.isValid} />
        })

        return (
            <div className='Auth'>
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button buttonType='Success'>SUBMIT</Button>
                </form>
                <Button buttonClicked={this.switchAuthModeHandler} buttonType='Danger'>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(null, mapDispatchToProps)(Auth)
