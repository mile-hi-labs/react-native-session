const Path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const Package = require('./package.json');

module.exports = env => {
  let config = {};
  config = generalConfig(config, env);
  config = prodConfig(config, env)
  config = devConfig(config, env);
  return config;
}

function generalConfig(config, env) {
  config.mode = env;
  config.entry = './src/index.jsx';
  config.externals = {
    'react': 'commonjs react',
    'react-native': 'react-native',
  };
  config.output = {
    path: Path.join(__dirname, 'lib'),
    filename: 'react-native-session.js',
    libraryTarget: 'commonjs2'
  };
  config.module = {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: Path.join(__dirname, 'node_modules'),
        use: 'babel-loader'
      },
    ]
  };
  config.resolve = {
    modules: [Path.join(__dirname, 'src'), 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ]
  }
  return config;
}


function prodConfig(config, env) {
  if (env != 'production') { return config }
  config.output = {
    path: Path.join(__dirname, 'releases'),
    filename: 'react-native-session@' + Package['version'] + '.js',
    libraryTarget: 'commonjs2'
  };
  config.plugins = [
    new CompressionPlugin(),
  ]
  return config;
}


function devConfig(config, env) {
  if (env != 'development') { return config }
  config.devtool = "source-map";
  return config;
}


// Webpack devtools
// https://webpack.js.org/configuration/devtool/
// https://webpack.js.org/plugins/eval-source-map-dev-tool-plugin/
