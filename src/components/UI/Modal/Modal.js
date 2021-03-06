import React, { Component } from 'react'
import './Modal.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children //rerender the Modal, and, consequently, the wrapped OrderSummary component only if the show prop changes or the modal content changes (to the spinner or back)
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