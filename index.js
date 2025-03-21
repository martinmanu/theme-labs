const themeLab = require('./lib/theme-lab'); // No need for `new ThemeLab()`

module.exports = {
    applyTheme: themeLab.applyTheme.bind(themeLab),
    generateThemeCSS: themeLab.generateClassThemeCSS.bind(themeLab),
    initialize: (themeData) => {
        if (!Array.isArray(themeData)) {
            throw new Error('Theme data must be an array');
        }

        themeData.forEach(theme => {
            if (!theme.themeName || !Array.isArray(theme.values)) {
                throw new Error('Each theme must have a "themeName" and a "values" array');
            }

            theme.values.forEach(entry => {
                if (!entry.keyName || entry.value === undefined) {
                    throw new Error(`Each entry in "values" must have a "keyName" and "value" in theme: ${theme.themeName}`);
                }
            });
        });

        return themeLab.initialize(themeData);
    }
};
