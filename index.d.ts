declare module "boot-theme" {
    /**
     * Applies the specified theme by name.
     * @param themeName The name of the theme to apply.
     */
    export function applyTheme(themeName: string): any;

    /**
     * Generates the CSS for the current theme.
     * @returns The generated CSS as a string.
     */
    export function generateThemeCSS(): string;

    /**
     * Initializes the theming system.
     * @param themeData The array of theme objects to initialize.
     * Each theme object must have a `themeName` (string) and `values` (array of key-value pairs).
     */
    export function initialize(themeData: Array<{ 
        themeName: string; 
        values: Array<{ keyName: string; value: string | number }>
    }>): void;
}
