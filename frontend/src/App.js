import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Homepage from './containers/homepage/homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homepage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
