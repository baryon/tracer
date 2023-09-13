module.exports = {
  'env': {
    'node': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-mixed-spaces-and-tabs': "off",
    'no-console': 'off',
    'no-unexpected-multiline': 'off'
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
}
