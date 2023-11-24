const createExpoWebpackConfig = require("@expo/webpack-config");
const webpack = require('webpack');
module.exports = async function (env, argv) {
  // env.mode = "development";
  const config = await createExpoWebpackConfig(env, argv);
  config.resolve.alias["@stripe/stripe-react-native"] = "null-loader";
  config.resolve.alias["react-native-maps"] = "null-loader";
  config.ignoreWarnings = [/Failed to parse source map/];
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    // "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "path": require.resolve("path-browserify")
  })
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      //  process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  config.module.rules.forEach(rule => {
    if (rule.oneOf instanceof Array) {
      rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/]
    }
    return rule
  })
  return config;
};