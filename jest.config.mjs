const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: [
    '**/src/Labs/lab-27/**/*.test.[jt]s?(x)',
    '**/src/Labs/lab-29/**/*.test.[jt]s?(x)'
  ]
};

export default config;
