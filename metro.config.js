/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 */

module.exports = {
  resolver: {
  	sourceExts: ['jsx','js']
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
