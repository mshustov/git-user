/* eslint-env browser */
/* global rempl */

rempl.getSubscriber(function(api) {
    const output = document.body.appendChild(document.createElement('div'));

    api.ns('storeChanged').subscribe(function(data) {
        console.log('storeChanged', data);
        // const effectId = data;
        // monitor.effectCancelled(effectId);
        output.innerHTML = data;
    });

    api.connected.link(function(state) {
        console.log('publisher connected:', state);
    });
});
