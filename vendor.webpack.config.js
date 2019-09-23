const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'axios',
      'lodash',
      '@material-ui/core',
      '@material-ui/icons',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'reselect',
      'styled-components',
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    }),
    new webpack.DllPlugin({
      path: 'dist/[name]-manifest.json',
      name: '[name]',
    }),
  ],
};
