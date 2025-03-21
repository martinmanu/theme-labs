const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

let document;

if (typeof window === 'undefined') {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  document = dom.window.document;
} else {
  document = window.document;
}

class ThemeLab {
  constructor() {
    this.themeConfig = [];
  }

  initialize(themeConfig) {
    this.themeConfig = themeConfig;
    this.generateRootThemeCSS();
    this.generateClassThemeCSS();
  }

  generateRootThemeCSS() {
    const filePath = path.join(__dirname, 'boot-theme.css');
    let cssContent = '';

    this.themeConfig.forEach(theme => {
      cssContent += `/* ${theme.themeName} theme */\n[data-theme="${theme.themeName}"] {\n`;

      theme.values.forEach(({ keyName, value }) => {
        if (value) {
          // For root, simply set the variable using the keyName
          cssContent += `  --${keyName}: ${value};\n`;
        }
      });

      cssContent += `}\n\n`;
    });

    this.writeToFile(filePath, cssContent, 'Root Theme CSS');
    this.injectCSS(cssContent, 'root-theme-styles');
  }

  generateClassThemeCSS() {
    const filePath = path.join(__dirname, 'boot-theme-classes.css');
    let cssContent = '/* Global theme classes (generated once) */\n';

    // Define a fallback mapping for types if subType is not provided.
    const propertyMapping = {
      "Colors": "color",
      "Box Shadow": "box-shadow",
      "Spacing & Sizing": "margin",
      "Borders & Outlines": "border"
    };

    // Collect unique keys with their type and subType information.
    const uniqueKeys = new Map(); // keyName -> { type, subType }
    this.themeConfig.forEach(theme => {
      theme.values.forEach(entry => {
        const { keyName, type, subType } = entry;
        if (!uniqueKeys.has(keyName)) {
          uniqueKeys.set(keyName, { type, subType });
        }
      });
    });

    // Generate the CSS classes using subType if available, or fallback to mapping based on type.
    uniqueKeys.forEach(({ type, subType }, keyName) => {
      const cssProperty = subType ? subType : (propertyMapping[type] || "color");
      cssContent += `.boot-theme-${keyName} { ${cssProperty}: var(--${keyName}); }\n`;
    });

    this.writeToFile(filePath, cssContent, 'Class Theme CSS');
    this.injectCSS(cssContent, 'class-theme-styles');
  }

  applyTheme(themeName) {
    const theme = this.themeConfig.find(t => t.themeName === themeName);
    if (!theme) {
      console.warn(`Theme "${themeName}" not found.`);
      return;
    }

    theme.values.forEach(({ keyName, value }) => {
      document.documentElement.style.setProperty(`--${keyName}`, value);
    });
    console.log(`Theme "${themeName}" applied successfully.`);
  }

  injectCSS(cssContent, styleId) {
    let styleTag = document.querySelector(`#${styleId}`);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = cssContent;
  }

  writeToFile(filePath, content, label) {
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8') !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`${label} file generated/updated successfully at`, filePath);
    } else {
      console.log(`No changes detected in ${label}, file not updated.`);
    }
  }
}

module.exports = new ThemeLab();
