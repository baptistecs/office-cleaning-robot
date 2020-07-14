module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jasmine'],
  env: {
    // browser: true,
    node: true,
    jasmine: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jasmine/recommended'],
  // https://eslint.org/docs/user-guide/configuring
  // parserOptions: {},
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
  // rules: {
  // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
  // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  // }
}
