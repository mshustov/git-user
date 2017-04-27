// import 'regenerator-runtime/runtime';

// TODO add warning for babel-env if no polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/';
import './polyfills/';
import App from './components/app/';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// function delay(time) {
//   return new Promise(function(res) {
//     setTimeout(res, time);
//   });
// }


// delay(100).then(function() {
//   const p = document.createElement('p');
//   p.innerText = 'hello';
//   document.body.insertBefore(p, null);
// });
