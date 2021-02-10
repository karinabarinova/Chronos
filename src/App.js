
import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      {/* <Switch></Switch> */}
    </BrowserRouter>
  );
}

export default App;
