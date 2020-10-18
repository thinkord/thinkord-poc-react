import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'


import { StoreProvider } from "./context"
// import Home from "./pages/Home"
import Layout from "./components/Layout/Layout"
import Work from "./pages/Work"
import WorkSpace from "./pages/Workspace"

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Layout>
        <Route exact path="/" component={WorkSpace} />
        <Route path="/folder/:id" component={WorkSpace} />
        <Route path="/work/:id" component={Work} />
      </Layout>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);

