module.exports = {
  'example e2e tests': function(browser) {
    // automatically uses dev Server port from /config.index.js
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    browser
      .url(devServer + '/example01.html')
      .waitForElementVisible('.exmaple-main', 10000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .end();
  }
};
