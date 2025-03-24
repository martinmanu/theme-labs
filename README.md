# Boot Theme

Boot Theme is a lightweight, configurable theming library designed to help you manage and apply themes effortlessly in your application. It works seamlessly with any frontend framework or library, offering an easy-to-use setup for fully configurable themes.

## Installation

Install Boot Theme via npm:

```sh
npm install boot-theme
```

## UI-Based Theme Configuration (Optional)

Boot Theme provides an interactive UI tool that allows users to generate theme data conveniently via the terminal. This tool helps users configure their theme settings visually before integrating them into their application.

Steps to Use the UI Tool:

Run the following command to launch the UI in your terminal:

if Locally installed then 
``` sh
 npx theme-lab-ui 
 # OR
 npx --no-install theme-lab-ui
```

else Globally then 
```sh
theme-lab-ui
```

Configure your theme settings using the UI.

Once configured, the UI tool will generate theme data that you can pass to the initialize function in your code.

This process will automatically generate both:

CSS root variables (to define theme values)

Theme utility classes (to apply styles efficiently in your UI)

After generation, you can use these classes to style your UI elements dynamically without manually writing CSS.

### Setting Up the CSS

To use the generated theme styles, you need to include the CSS file in your project.

### For Plain JavaScript (HTML)

Add the following <link> tag in your HTML file to include the CSS:

```html
<!-- Not needed after version 2.0.0 -->
<link rel="stylesheet" href="node_modules/boot-theme/lib/boot-theme-classes.css">
<link rel="stylesheet" href="node_modules/boot-theme/lib/boot-theme.css">
```
If you're using a build tool like Webpack or Vite, it may automatically resolve the node_modules path.

### For Angular

In Angular projects, add the CSS path to the angular.json configuration file under the styles section:

```Css
/*Not needed after version 2.0.0 */
import 'theme-labs/lib/theme-lab.css';
import 'theme-labs/lib/theme-lab.css';
/* OR */
"styles": ["node_modules/boot-theme/lib/boot-theme-classes.css"]
"styles": ["node_modules/boot-theme/lib/boot-theme.css"]
```
This ensures that the theme styles are bundled into your Angular application during the build process.

### For React

In React applications, you can import the CSS file directly in your entry file (e.g., App.js or index.js):

```js
//Not needed after version 2.0.0
import 'boot-theme/lib/boot-theme-classes.css';
import 'boot-theme/lib/boot-theme.css';
```

Alternatively, you can add it in your index.html file using a <link> tag, as shown in the HTML setup.

## Applying Theme Classes in Your UI

Once the theme data is initialized, Boot Theme automatically generates:

Root CSS Variables: These define theme-specific properties like colors, spacing, and shadows.

Utility Classes: Classes prefixed with .boot-theme- that allow easy application of theme styles.

Example Usage:

```HTML
<div class="boot-theme-primary">Themed Text</div>
<div class="boot-theme-box-shadow">Themed Shadow</div>
```

By adding these classes to your elements, you can dynamically apply theme-based styling without writing custom CSS rules.

## Initializing Boot Theme in Your Project

After generating your theme configuration from the UI tool, pass it to the initialize function:

```js
//Sample Data
import ThemeLab from 'boot-theme';

const themeConfig = [
[
  {
    "themeName": "Light",
    "expanded": false,
    "values": [
      {
        "keyName": "primary-bg",
        "type": "Colors",
        "subType": "background-color",
        "value": "#66ff69"
      },
      {
        "keyName": "primary-color",
        "type": "Colors",
        "subType": "color",
        "value": "#000000"
      },
      {
        "keyName": "secondary-color",
        "type": "Colors",
        "value": "#d21919",
        "subType": "color"
      },
      {
        "keyName": "padding-container1",
        "type": "Spacing & Sizing",
        "subType": "padding",
        "value": "10px",
        "numericValue": 10,
        "unit": "px"
      },
      {
        "keyName": "margin-x",
        "type": "Spacing & Sizing",
        "subType": "margin",
        "value": "1em",
        "numericValue": 1,
        "unit": "em"
      },
      {
        "keyName": "bx-1",
        "type": "Box Shadow",
        "shadowX": 8,
        "value": "8px 6px 1px #762828",
        "shadowY": 6,
        "blur": 1,
        "shadowColor": "#762828"
      }
    ]
  },
  {
    "themeName": "Dark",
    "expanded": true,
    "values": [
      {
        "keyName": "primary-bg",
        "type": "Colors",
        "subType": "background-color",
        "value": "#fe6767"
      },
      {
        "keyName": "primary-color",
        "type": "Colors",
        "subType": "color",
        "value": "#71fc27"
      },
      {
        "keyName": "secondary-color",
        "type": "Colors",
        "subType": "color",
        "value": "#0f4bff"
      },
      {
        "keyName": "padding-container1",
        "type": "Spacing & Sizing",
        "subType": "padding",
        "value": "23em",
        "numericValue": 23,
        "unit": "em"
      },
      {
        "keyName": "margin-x",
        "type": "Spacing & Sizing",
        "subType": "margin",
        "value": "23%",
        "numericValue": 23,
        "unit": "%"
      },
      {
        "keyName": "bx-1",
        "type": "Box Shadow",
        "shadowX": 23,
        "value": "23px 23px 23px #f52424",
        "shadowY": 23,
        "blur": 23,
        "shadowColor": "#f52424"
      }
    ]
  }
]
];

ThemeLab.initialize(themeConfig);
```

This function:

Generates the CSS root variables

```CSS
/* Light theme */
[data-theme="Light"] {
  --primary-bg: #66ff69;
  --primary-color: #000000;
  --secondary-color: #d21919;
  --padding-container1: 10px;
  --margin-x: 1em;
  --bx-1: 8px 6px 1px #762828;
}

/* Dark theme */
[data-theme="Dark"] {
  --primary-bg: #fe6767;
  --primary-color: #71fc27;
  --secondary-color: #0f4bff;
  --padding-container1: 23em;
  --margin-x: 23%;
  --bx-1: 23px 23px 23px #f52424;
}
```

** Generates utility classes ** 

```CSS
/* Global theme classes (generated once) */
.boot-theme-primary-bg { background-color: var(--primary-bg); }
.boot-theme-primary-color { color: var(--primary-color); }
.boot-theme-secondary-color { color: var(--secondary-color); }
.boot-theme-padding-container1 { padding: var(--padding-container1); }
.boot-theme-margin-x { margin: var(--margin-x); }
.boot-theme-bx-1 { box-shadow: var(--bx-1); }
```

Injects the styles dynamically into your project

## Switching Themes Dynamically

To switch themes at runtime, call:

```js
ThemeLab.applyTheme('dark'); // Switches to dark theme
ThemeLab.applyTheme('light'); // Switches back to light theme
```

This method updates the CSS variables and applies the selected theme instantly.

## Why Use Boot Theme?

### ✔ Lightweight & Efficient – Minimal impact on performance
### ✔ Configurable UI Tool – Easily generate themes via the terminal
### ✔ Framework-Agnostic – Works with Angular, React, Vue, or plain HTML/CSS
### ✔ Easy Styling – Utility classes make styling fast and flexible
### ✔ Dynamic Theme Switching – Apply themes programmatically at runtime

Install Boot Theme and start theming your application effortlessly!
