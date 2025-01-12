const ThemeLab = require('./lib/theme-lab');
const themeConfig = require('./utils/sample-data.json');

const themeLab = new ThemeLab(themeConfig);
module.exports = {
    applyTheme: (themeName) => themeLab.applyTheme(themeName),
    generateThemeCSS: () => themeLab.generateThemeCSS(),
    initialize: () => themeLab.initialize(),
  };