module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '(/test/unit/.*|(\\.|/)(test|spec))\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        astTransformers: {
          before: ['node_modules/tsconfig-paths-hook/transformer'],
        },
      },
    ],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/jest-setup.ts'],
};
