const packageEntrys = require('../config/build-entrys').entrys
const renameOverwrite = require('rename-overwrite')
const chalk = require('chalk')
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const distEntry = 'dist';

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function isEnabled(filepath) {
  for (let i = 0; i < packageEntrys.length; i++) {
    if (new RegExp('/' + packageEntrys[i] + '.html$', 'ig').test(filepath)) {
      return true;
    }
  }
  return false;
}

function renameEntrys(filepaths) {
  let readable, newfile;

  if (Array.isArray(filepaths) && filepaths.length > 0) {
    filepaths.forEach((file)=>{

      readable = true;
      try {
        fs.accessSync(file, fs.constants.R_OK);
      } catch (e) {
        readable = false;
      }

      if (readable && isEnabled(file)) {
        newfile = file.replace(/[a-zA-z]+[\w\-]+\.html$/ig, 'index.html');
        renameOverwrite(file, newfile)
        .then(() => console.log(chalk.green(
          '  rename: ' + file + '】\n' +
          '  to： 【' + newfile + '】.\n'
        )))
        .catch(err => console.log(err, file))
      }
    });
  }
}

pathdata = renameEntrys(glob.sync(resolve(distEntry) + '/**/*.html'));
