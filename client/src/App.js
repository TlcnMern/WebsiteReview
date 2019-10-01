import React from 'react';
import MainRouter from './MainRouter.js';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <MainRouter/>
    </Provider>
  );
}

export default App;
