###Used technologies
* React
* Redux
* Webpack
* [Redux-saga](https://github.com/yelouafi/redux-saga)

###Run project
```bash
npm run dev
```

type a couple of letters in input
there are 2 types of erros
1. error is thrown during executing effect (now we throw error in `src/utils/api.js:14`)
2. error in task (uncomment `src/ducks/side-effects/user/index.js:40`)
