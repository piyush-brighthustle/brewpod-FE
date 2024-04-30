module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.svg', '.jpg'],
        alias: {
          '@components': './src/components',
          '@type': './src/type',
          '@utils': './src/utils',
          '@store': './src/store',
          '@actions': './src/actions',
          '@reducers': './src/reducers',
          '@screens': './src/screens',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
