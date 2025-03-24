const themeLab = require('./lib/theme-lab'); // Already an instance

module.exports = {
  initialize: (themeData) => themeLab.initialize(themeData),
  applyTheme: (themeName) => themeLab.applyTheme(themeName),
  generateThemeCSS: () => themeLab.generateClassThemeCSS()
};
