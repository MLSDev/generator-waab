# generator-waab

### Webpack Angular Application Builder
[![Build Status](https://travis-ci.org/MLSDev/generator-waab.svg?branch=master)](https://travis-ci.org/MLSDev/generator-waab)

> Angular 2/4 application generator based on webpack bundling system
 
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
yo waab
```

Now the project is created. You can start developing

### Documentation
* [How to update generator](./docs/how_to_update.md)
* [Install options](./docs/installation_options.md)
* [App structure](./docs/app_structure.md)
* [App development details and features](./docs/development.md)
* [Unit testing](./docs/testing.md)

  
## [MIT License](./LICENSE)

## About MLSDev

[![alt text](./mlsdev-logo.png "MLSDev.com")][mlsdev]

generator-waab is maintained by MLSDev, Inc. We specialize in providing all-in-one solution in mobile and web development. Our team follows Lean principles and works according to agile methodologies to deliver the best results reducing the budget for development and its timeline. 

Find out more [here][mlsdev] and don't hesitate to [contact us][contact]!

[mlsdev]: http://mlsdev.com
[contact]: http://mlsdev.com/contact_us

