import React from 'react';
import MainRouter from './MainRouter.js';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainRouter/>
      </div>
    </Provider>
  );
}

export default App;
