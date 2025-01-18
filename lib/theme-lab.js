const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

let document;

if (typeof window === 'undefined') {
  // If in Node.js, simulate the browser environment using jsdom
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  document = dom.window.document;
} else {
  // If in the browser, use the window.document directly
  document = window.document;
}

class ThemeLab {
  constructor(themeConfig) {
    this.themeConfig = themeConfig;
  }

  initialize() {
    this.generateRootThemeCss();
  }

  generateRootThemeCss() {
    const filePath = path.join(__dirname, 'theme-lab.css');
    let cssContent = '';
    this.themeConfig.forEach(theme => {
      let themeName = theme.themeName;
      let colors = theme.colors;
      cssContent += `/* ${themeName} theme */\n`;
      cssContent += `[data-theme="${themeName}"] {\n`;
      Object.entries(theme.colors).forEach(([key, value]) => {
        cssContent += `  --${key}: ${value};\n`;
      });
      cssContent += `}\n\n`;
    });

    this.themeConfig.forEach(theme => {
      let colors = theme.colors;
      console.log(colors);
      Object.entries(colors).forEach(([key, value]) => {
        cssContent += `.theme-lab-${key} {\n  color: var(--${key});\n}\n\n`;
      });
    });
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8') !== cssContent) {
      fs.writeFileSync(filePath, cssContent, 'utf8');
      console.log('CSS file generated/updated successfully at', filePath);
    } else {
      console.log('No changes detected, CSS file not updated.');
    }
    this.loadThemeCSS();
  }

  loadThemeCSS() {
    const cssPath = './lib/theme-lab.css';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
    console.log('CSS loaded successfully.');
  }

  // Function to apply theme to document
  applyTheme(themeName) {
    const theme = this.themeConfig.find(t => t.themeName === themeName);
    if (!theme) {
      console.warn(`Theme "${themeName}" not found.`);
      return;
    }

    // Apply each color property to the CSS custom properties (CSS variables)
    for (const [key, value] of Object.entries(theme.colors)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
    console.log(`Theme "${themeName}" applied successfully.`);
  }

  // Function to generate and inject the CSS content into the browser
  generateThemeCSS() {
    let cssContent = '';

    // Iterate over themes and generate CSS rules
    this.themeConfig.forEach(theme => {
      const themeName = theme.themeName;
    //   const colors
      for (const [key, value] of Object.entries(theme.colors)) {
        cssContent += `.theme-lab-${key} { color: ${value}; }\n`;
      }
    });

    // For browser environments, inject the CSS into the document as a <style> element

      const styleTag = document.createElement('style');
      styleTag.innerHTML = cssContent;
      document.head.appendChild(styleTag);

      console.log('CSS applied to document successfully.');

    //   fs.writeFileSync('./styles/theme-lab.css', cssContent);
    //   console.log('CSS file generated successfully.');

  }
}

module.exports = ThemeLab;
