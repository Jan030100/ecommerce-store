/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  roots: ['<rootDir>'],
  
  testMatch: [
    '<rootDir>/__tests__/**/*.test.ts',
  ],
  
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  clearMocks: true,
  collectCoverageFrom: [
    'lib/**/*.ts',
    '!**/node_modules/**',
  ],
};