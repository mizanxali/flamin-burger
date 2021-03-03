import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import OrderHistory from './containers/OrderHistory/OrderHistory'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
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

export default App;
