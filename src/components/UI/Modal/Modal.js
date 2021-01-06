import React, { Component } from 'react'
import './Modal.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show //rerender the Modal, and, consequently, the wrapped OrderSummary component only if the show prop changes
    }

    componentDidUpdate() {
        console.log('Modal did update');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} backdropClicked={this.props.modalClosed} />
                <div className="Modal" style={{textAlign: 'center', transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal