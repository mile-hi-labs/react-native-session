module.exports = {
  presets: ['module:@haul-bundler/babel-preset-react-native'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
        	'.js',
          '.jsx',
        	'.ts',
        	'.tsx',
        	'.js',
        	'.ios.js',
        	'.ios.jsx',
        	'.android.js',
        	'.android.jsx'
      	],
        root: ['./src']
      }
    ],
  ]
};

// Docs
// https://www.npmjs.com/package/babel-plugin-module-resolver
// Required for absolute paths
