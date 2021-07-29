export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '(^.+\\.tsx?$)|(@mntm)': ['esbuild-jest', {
      sourcemap: false
    }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@mntm)'
  ],
  testRegex: '/__tests__/.+(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  resolver: "jest-ts-webcompat-resolver"
};
