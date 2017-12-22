import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/';
import './polyfills/';
import App from './components/app/';

const rempl = require('rempl');

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

window.rempl = rempl;
global.rempl = rempl;

const transport = rempl.createPublisher('myTool', rempl.scriptFromFile('/rempl-browser-ui.js'));

store.subscribe(function onStoreChage() {
    const storeState = store.getState();
    const serializedState = JSON.stringify(storeState, null, 2);
    transport.ns('storeChanged').publish(serializedState);
});
