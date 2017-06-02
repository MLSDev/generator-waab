'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const _ = require('lodash');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    let done = this.async();

    this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter your application name',
        default: this.config.get('appName') || 'testApp'
      },
      {
        type: 'checkbox',
        name: 'filesToUpdate',
        message: 'Select files, which you want to generate',
        choices: [
          {
            name: 'App constants',
            value: 'constants',
            checked: true
          },
          {
            name: 'Builder configs',
            value: 'configs',
            checked: true
          },
          {
            name: 'App src files',
            value: 'src',
            checked: true
          },
          {
            name: 'Basic app files',
            value: 'basic',
            checked: true
          },
          {
            name: 'Create assets folders',
            value: 'assets',
            checked: true
          }
        ]
      }
    ]).then((answers) => {
      this.config.set('appName', answers.appName);
      this.config.set('filesToUpdate', answers.filesToUpdate);
      this.config.save();
      done();
    })
  }

  writing() {
    const appName = this.config.get('appName');
    const filesToUpdate = this.config.get('filesToUpdate');

    if (_.indexOf(filesToUpdate, 'basic') !== -1) {
      let packageFile = require(this.templatePath('single/_package.json'));
      
      let packageJSON = {
        name: _.kebabCase(appName),
        version: '0.1.0',
        main: 'index.js',
        devDependencies: packageFile.devDependencies,
        dependencies: packageFile.dependencies,
        scripts: packageFile.scripts
      };

      this.fs.writeJSON('package.json', packageJSON);

      this.fs.copy(
        this.templatePath('single/gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('single/_README.md'),
        this.destinationPath('README.md'),
        {
          appName: appName
        }
      );
      this.fs.copy(
        this.templatePath('single/_CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md')
      );
    }

    if (_.indexOf(filesToUpdate, 'constants') !== -1) {
      this.fs.copy(
        this.templatePath('config/app'),
        this.destinationPath('config/app')
      );
    }

    if (_.indexOf(filesToUpdate, 'configs') !== -1) {
      this.fs.copy(
        this.templatePath('config/base.js'),
        this.destinationPath('config/base.js')
      );
      this.fs.copy(
        this.templatePath('config/builder'),
        this.destinationPath('config/builder')
      );
      this.fs.copy(
        this.templatePath('config/test'),
        this.destinationPath('config/test')
      );
      this.fs.copy(
        this.templatePath('static'),
        this.destinationPath('')
      );
    }

    if (_.indexOf(filesToUpdate, 'src') !== -1) {
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );
      this.fs.copyTpl(
        this.templatePath('single/app.component.ts'),
        this.destinationPath('src/app/app.component.ts'),
        {
          appName: appName
        }
      );
    }

    if (_.indexOf(filesToUpdate, 'assets') !== -1) {
      mkdirp('src/app/vendor');
      mkdirp('src/public');
      mkdirp('src/public/favicon');
      mkdirp('src/public/fonts');
      mkdirp('src/public/images');
      mkdirp('src/public/locales');
      mkdirp('src/styles/vendor');
    }
  }

  install() {
    this.log('All files were copied ' + chalk.green('successfully'));
  }
  
  end() {
    this.log(yosay('Before start working with project take a look at ' +
      chalk.green('README.md') + ' file in root folder!'));
  }
};