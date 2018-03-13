const path = require('path')
const copy = require('copy')
const d = path.resolve(__dirname, '../node_modules/element-ui')

copy(path.resolve(__dirname, './element-ui/**/*.vue'), d, function(err, files) {
  if (err) throw err;
  console.log('updating vue total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.js'), d, function(err, files) {
  if (err) throw err;
  console.log('updating js total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.ts'), d, function(err, files) {
  if (err) throw err;
  console.log('updating ts total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.scss'), d, function(err, files) {
  if (err) throw err;
  console.log('updating scss total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.css'), d, function(err, files) {
  if (err) throw err;
  console.log('updating css total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.ttf'), d, function(err, files) {
  if (err) throw err;
  console.log('updating ttf total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.woff'), d, function(err, files) {
  if (err) throw err;
  console.log('updating woff total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.jpg'), d, function(err, files) {
  if (err) throw err;
  console.log('updating jpg total of ', files.length, 'files...');
});

copy(path.resolve(__dirname, './element-ui/**/*.png'), d, function(err, files) {
  if (err) throw err;
  console.log('updating png total of ', files.length, 'files...');
});
