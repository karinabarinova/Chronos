
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/index';
import GlobalStyle from './globalStyles';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Navbar, Footer } from './components'
import Home from './containers/HomePage/Home';
import Services from './containers/Services/Services';
import Products from './containers/Products/Products';
import SingUp from './containers/SingUp/SingUp';
import ScrollToTop from './components/scrollToTop';
import SingIn from './containers/SignIn/SingIn';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import ResetPasswordValidate from './containers/ResetPassword/ResetPasswordValidate'
import Logout from './containers/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/services" exact component={Services} />
          <Route path="/products" exact component={Products} />
          <Route path="/sign-up" exact component={SingUp} />
          <Route path="/sign-in" exact component={SingIn} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route path="/reset-password-confirm" exact component={ResetPasswordValidate} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" exact component={Services} />
          <Route path="/products" exact component={Products} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/account" component={Account} />
          <Route component={NotFound} */}
        </Switch>
      )
    }
    return (
      <>
       <GlobalStyle />
        <ScrollToTop />
        <Navbar isAuthenticated={this.props.isAuthenticated} />
        {routes}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.jwtToken != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
