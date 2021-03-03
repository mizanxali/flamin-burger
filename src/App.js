import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import OrderHistory from './containers/OrderHistory/OrderHistory'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp()
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={OrderHistory} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/logout' exact component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
