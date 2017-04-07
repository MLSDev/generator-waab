# generator-waab

### Webpack Angular Application Builder
[![Build Status](https://travis-ci.org/MLSDev/generator-waab.svg?branch=master)](https://travis-ci.org/MLSDev/generator-waab)

> Angular 2 application generator based on webpack bundling system
 
## Features

* Basic angular 2 dependencies  
* Basic dependencies for unit testing (only jasmine for now)
* Support develop environment configurations
* Compilation of [Pug](https://pugjs.org), [Stylus](https://learnboost.github.io/stylus/), [Typescript](https://www.typescriptlang.org/)
* Linting Typescript with [TSLint](https://palantir.github.io/tslint/) based on rules from [codelyzer](https://github.com/mgechev/codelyzer)
* Running unit tests with [Karma](https://karma-runner.github.io/1.0/index.html)
* Images optimization using [imagemin-webpack](https://github.com/itgalaxy/imagemin-webpack) based on [imagemin](https://github.com/imagemin/imagemin)

## Quick start
Make sure you have Node version >= 6.1 and NPM >= 4.1

```
# install yeoman globally
npm install -g yo

# install generator globally
npm install -g generator-waab

# move to app folder
cd /my-app

# run generator
yo generator-waab
```

Now the project is created. You can start developing

### App structure
 App structure is based on component approach, proposed in [Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#application-structure-and-angular-modules).
 
 ```
 application-root/
  ├──config/                        * bundler and test configurations
  |   ├──app/                       * constants for application used in index.ejs template and in scripts
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
  |   ├──index.ejs                  * index page template 
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

### Development
 Before starting development install npm packages (if you declined automatic installation).
 Running compile/build/test tasks are based on **npm scripts** from `package.json`
 
```
# developing locally
npm run start:local

# running build for develop environment
npm run start:dev

# running build for staging environment
npm run start:staging

# running build for production environment
npm run start:prod
```

#### Build Features
 * `dist` - destination folder for compiled builds
 * `src/app` - all application files should be located here (except static files and global styles)
 * `src/app/vendor` - vendor custom libraries and scripts should be located here
 * `src/styles/vendor` - vendor css files (like bootstrap themes) should be located here
 * files from `vendor` folders (styles and scripts) will be exported to separate file
 * when running `staging` and `production` builds, all files will have their unique `chunkid` for better performance 
 * `webpack-dev-server` is used for local developing
  
### Unit testing 
All unit tests should be located in the same folder with tested component, and should have `spec` separated by dots in filename (Example: `app.component.spec.ts`). For now [Jasmine](https://jasmine.github.io/) is the only test framework used.
   
```
# running tests while developing
npm run test:dev

# single tests run
npm run test

# single tests run with code coverage output
npm run test:coverage
```

## License
[The MIT License](./LICENSE)

