// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  globals: {
    '$': true,
    'jQuery': true,
    'Vue': true,
    'Vuex': true,
    'VueRouter': true,
    'ELEMENT': true,
    'echarts': true,
    'XLSX': true,
    'pako': true
  },
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'elemefe',
  // required to lint *.vue files
  plugins: [
    'html',
    'vue',
    'json'
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  // add your custom rules here
  'rules': {
    "no-undef": 1,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
