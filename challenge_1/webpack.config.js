/*eslint-disable */
const path = require('path');

const clientDirectory = path.join(__dirname, './client/app.jsx');
const publicDirectory = path.join(__dirname, './public');

module.exports = {
  mode: 'development',
  entry: clientDirectory,
  output: {
    path: publicDirectory,
    filename: 'bundle.js',
  },
  module: {
    rules: [
    {
      test: /\.jsx$/,
      include: clientDirectory,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    }]
  }
}