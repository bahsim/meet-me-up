## Technologies

- [React](https://reactjs.org/) A JavaScript library for building user interfaces
- [Material-UI](https://material-ui-next.com/) React components that implement Google's Material Design
- [Redux](https://redux.js.org/) Predictable state container for JavaScript apps
- [Redux-Form](https://redux-form.com/) The best way to manage your form state in Redux.
- [React-Router](https://reacttraining.com/react-router/) Collection of navigational components that compose declaratively with your application
- [Styled-Components](https://www.styled-components.com/) Visual primitives for the component age
- [Offline-plugin](https://github.com/NekR/offline-plugin) Provides an offline experience for webpack projects
- [PM2](http://pm2.keymetrics.io/) Advanced, production process manager for Node.js
- [Babel](https://babeljs.io/) Use next generation JavaScript
- [ESLint](https://eslint.org/) The pluggable linting utility for JavaScript and JSX
- [Husky](https://github.com/typicode/husky) Git hooks made easy
- [Prettier](https://prettier.io) Opinionated code formatter
- [Webpack](https://webpack.js.org/) Bundler

## How to use

- For running in development
```
npm install
npm run dev
```

- For running in production
```
npm install
npm start
```

### Development

- `npm run dev` - run webpack in development build with watch and server concurrently
- `npm run build:dev` - run build in development mode with watch
- `npm run serve:dev` - run server in development

### Production

- `npm run start` - run webpack in production mode and server with `pm2`
- `npm run build` - run build in production mode
- `npm run serve` - run server in production with pm2


## Tools

- `npm run clean` - clean build directory
- `npm run lint` - run lint checker
- `npm run prettier` - run prettier for beautifying code
- `npm run lintfix` - run linter in fix mode for editing errors, which it is able to
