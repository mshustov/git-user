import 'babel-polyfill';
import path from 'path';

Promise.resolve()
    .then(() => {
        return new Promise(res => {
            setTimeout(res, 100);
        });
    })
    .then(() => {
        const filePath = path.resolve('../package.json');
        console.log(global['NodeList']);
    });
