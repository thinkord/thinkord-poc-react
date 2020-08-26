import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'


import { StoreProvider } from "./context"
import Home from "./pages/Home"
import Work from "./pages/Work"

ReactDOM.render(
  <StoreProvider>
    <Router>
      <div>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/work/:id" component={Work} />
        </main>
      </div>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);

