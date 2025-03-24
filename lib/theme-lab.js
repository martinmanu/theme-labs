const fs = require('fs');
const path = require('path');
let document;

// Use the browser's document if available; otherwise, use jsdom for Node.
if (typeof window !== 'undefined' && window.document) {
  document = window.document;
} else {
  // In Node, use jsdom
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  document = dom.window.document;
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
    let cssContent = '';

    this.themeConfig.forEach(theme => {
      cssContent += `/* ${theme.themeName} theme */\n[data-theme="${theme.themeName}"] {\n`;
      theme.values.forEach(({ keyName, value }) => {
        if (value) {
          cssContent += `  --${keyName}: ${value};\n`;
        }
      });
      cssContent += `}\n\n`;
    });

    // Only write the file if running in Node.
    if (typeof window === 'undefined') {
      const filePath = path.join(__dirname, 'boot-theme.css');
      this.writeToFile(filePath, cssContent, 'Root Theme CSS');
    }
    // Always inject the CSS into the document.
    this.injectCSS(cssContent, 'root-theme-styles');
  }

  generateClassThemeCSS() {
    let cssContent = '/* Global theme classes (generated once) */\n';

    // Fallback mapping for types if subType is not provided.
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

    // Generate the CSS classes using subType if available, otherwise fallback.
    uniqueKeys.forEach(({ type, subType }, keyName) => {
      const cssProperty = subType ? subType : (propertyMapping[type] || "color");
      cssContent += `.boot-theme-${keyName} { ${cssProperty}: var(--${keyName}); }\n`;
    });

    // Only write the file if running in Node.
    if (typeof window === 'undefined') {
      const filePath = path.join(__dirname, 'boot-theme-classes.css');
      this.writeToFile(filePath, cssContent, 'Class Theme CSS');
    }
    // Inject the CSS into the document.
    this.injectCSS(cssContent, 'class-theme-styles');
  }

  applyTheme(themeName) {
    const theme = this.themeConfig.find(t => t.themeName === themeName);
    if (!theme) {
      return;
    }

    // Set the data-theme attribute on the <html> element.
    document.documentElement.setAttribute('data-theme', themeName);

    // Update CSS variables.
    theme.values.forEach(({ keyName, value }) => {
      document.documentElement.style.setProperty(`--${keyName}`, value);
    });

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
    } else {
    }
  }
}

module.exports = new ThemeLab();
