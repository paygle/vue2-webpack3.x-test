// https://github.com/michael-ciniawsky/postcss-load-config
const autoprefixer = require('autoprefixer');

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-import': {
      addModulesDirectories: ['src/scss'],
      resolve: function(id, base) {
        return glob.sync(path.join(base, id));
      }
    },
    autoprefixer: { browsers: ['last 2 versions', 'iOS >= 8'] }
  }
}
