import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return (
            <div>
                <Redirect to='/' />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
