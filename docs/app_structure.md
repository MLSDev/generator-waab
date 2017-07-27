### App structure
 App structure is based on component approach, proposed in [Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#application-structure-and-angular-modules).
 
 ```
 application-root/
  ├──config/                        * bundler and test configurations
  |   ├──constants/                 * constants for application used in index.html template and in scripts
  |   │   └──<env>.js               * config files for different environments
  |   ├──builder/                   * webpack bundler configs
  |   │   ├──styles-loader/         * exported configurable style loaders
  |   │   └──<env>.js               * <env> configs for webpack
  |   ├──test/                      * configs running unit tests with karma
  |   └──base.js                    * common webpack configs
  │
  ├──src/                           * source files for the application
  |   ├──app/                       * web app folder
  │   │   └──polyfills.ts           * polyfills file
  │   │
  |   ├──meta/                      * folder containing files for SEO 
  |   ├──public/                    * all public files folder (fonts, images, favicons, translations) 
  |   ├──styles/                    * common styles for application 
  │   │  
  |   ├──index.html                 * index page template 
  |   └──index.ts                   * root script file 
  │
  ├──global-typings.d.ts            * types definitions for global variables inserted by DefinePlugin 
  ├──karma.conf.js                  * karma root configuration file
  ├──package.json
  ├──tsconfig.json                  * typescript config used outside webpack
  ├──tsconfig.webpack.json          * config that webpack uses for typescript
  ├──tslint.json                    * typescript lint config
  └──webpack.config.js              * webpack root configuration file
```
