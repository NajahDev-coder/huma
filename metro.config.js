// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
/*config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
    // Terser options...
};*/
config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
    },
});
module.exports = config;
