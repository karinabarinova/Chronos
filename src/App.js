
import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components'
import Home from './containers/HomePage/Home';
import Services from './containers/Services/Services';
import Products from './containers/Products/Products';
import SingUp from './containers/SingUp/SingUp';
import ScrollToTop from './components/scrollToTop';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" exact component={Services} />
        <Route path="/products" exact component={Products} />
        <Route path="/sing-up" exact component={SingUp} />
      </Switch>
      <Footer />
      {/* <Switch></Switch> */}
    </BrowserRouter>
  );
}

export default App;
