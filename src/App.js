import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
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
    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={Auth} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/orders' component={OrderHistory} />
          <Route path='/checkout' component={Checkout} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token!==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
