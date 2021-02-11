
import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components'
import Home from './containers/HomePage/Home';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
      {/* <Switch></Switch> */}
    </BrowserRouter>
  );
}

export default App;
