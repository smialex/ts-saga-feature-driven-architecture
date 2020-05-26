import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter } from 'react-router-dom';
import {configureStore} from './store';
import { Pages } from './pages';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          Hello App
        </div>
        <Pages/>
      </BrowserRouter>
    </Provider>
   
  );
}

export default App;
