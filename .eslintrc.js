module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    camelcase: 'off',
    'no-unused-vars': 'off'
  }
}
