# theme-labs
"ThemeLab is a lightweight, configurable theming library to help you manage and apply themes in your app. Developed for easy use in any frontend framework or libraries with direct focus on development ease in setting up a fully fledged configurable themes for your application."
---------------------------------------------------------------------------------------------------------------------

<!-- ThemeLabs functions-->

---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

<!-- Steps for setting up the CSS -->
**For Plain JavaScript (HTML)**
The consuming project should add a <link> tag pointing to the CSS file in node_modules. For example:

# <link rel="stylesheet" href="node_modules/theme-labs/lib/theme-lab.css">

# <link rel="stylesheet" href="theme-labs/lib/theme-lab.css">
If you're using a build tool (like Webpack, Vite, etc.), the build tool may automatically resolve node_modules paths, so you can import it like shown above.
---------------------------------------------------------------------------------------------------------------------

**Angular**
In Angular, you should add the CSS path to the angular.json configuration file under the "styles" section. The path will resolve from node_modules:

# "styles": ["node_modules/theme-labs/lib/theme-lab.css"]
This will ensure the CSS is bundled into your Angular app during the build process.
---------------------------------------------------------------------------------------------------------------------

**React**
React applications can use relative imports to reference CSS files directly from node_modules. You would typically import the CSS file in your App.js or entry file:

# import 'theme-labs/lib/theme-lab.css';
If you prefer to add it in your HTML index.html file, you can add a <link> tag as shown above.
