// import 'babel-polyfill';

require.ensure([], function(require) {
    require('./client.js');
}, 'app.js');
