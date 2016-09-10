import './polyfills/';

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/';
import { Provider } from 'react-redux';

import App from './components/app/';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
