import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import { StoreProvider } from "./context"
import App from "./pages/Home"
import Work from "./pages/Work"

ReactDOM.render(
  <StoreProvider>
    <Router>
      <div>
        <main>
          <Route exact path="/" component={App} />
          <Route path="/work" component={Work} />
        </main>
      </div>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);

