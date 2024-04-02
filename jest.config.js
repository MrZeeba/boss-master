module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverage: false,
  coverageDirectory: './test-coverage-report',
  collectCoverageFrom: [
    '**/*.{tsx,js,jsx}',
    '!**/.expo/**',
    '!**/__tests__/**',
    '!**/test-coverage-report/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!**/.prettierrc.js',
  ],
};
