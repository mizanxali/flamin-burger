import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {error: null}

            axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axiosInstance.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error});
            });
        }

        errorDismissedHandler() {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorDismissedHandler.bind(this)}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler