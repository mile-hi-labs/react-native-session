const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

function sharedConfig() {
  return {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
      path: __dirname + '/lib',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: 'babel-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'demos'),
          use: 'babel-loader'
        }
      ]
    },
    externals: {
      'react': 'commonjs react' 
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ]
    }
  }
}

module.exports = env => {
  console.log('Production: ', env.production ? true : false);
  let config = sharedConfig();
  if (env.production) {
    config.plugins = [
      new CompressionPlugin()
    ]
    return config;
  }
  config.plugins = [
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ];
  return config
}

// Webpack devtools
// https://webpack.js.org/configuration/devtool/