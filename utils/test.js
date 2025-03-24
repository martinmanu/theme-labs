const { applyTheme, generateThemeCSS, initialize } = require('../index');
const themeConfig = require('./sample-data.json');

initialize(themeConfig);
applyTheme('Light');
// generateClassThemeCSS();
