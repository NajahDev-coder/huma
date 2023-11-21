module.exports = function (api) {
  api.cache(true);
  const disableImportExportTransform = true;
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          native: {
            disableImportExportTransform,
          },
          web: {
            disableImportExportTransform,
          },
        },
        'module:metro-react-native-babel-preset'
      ],
    ],
    // presets: ['module:metro-react-native-babel-preset'],
    plugins: ['@babel/plugin-transform-export-namespace-from', 'react-native-reanimated/plugin'],
  };
};