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
        type: 'confirm',
        name: 'runInstall',
        message: 'Do you want to ' +
          chalk.yellow('install packages') +
            ' right after project initialization?',
        default: true
      }
    ]).then((answers) => {
      this.config.set('appName', answers.appName);
      this.config.set('runInstall', answers.runInstall);
      this.config.save();
      done();
    })
  }

  writing() {
    const appName = this.config.get('appName');
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
    this.fs.copy(
      this.templatePath('static'),
      this.destinationPath('')
    );
    this.fs.copy(
      this.templatePath('config'),
      this.destinationPath('config')
    );
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
    mkdirp('src/app/shared');
    mkdirp('src/app/vendor');
    mkdirp('src/public');
    mkdirp('src/public/favicon');
    mkdirp('src/public/fonts');
    mkdirp('src/public/images');
    mkdirp('src/public/locales');
    mkdirp('src/styles/vendor');
  }

  install() {
    this.log('All files were copied ' + chalk.green('successfully'));

    const runInstall = this.config.get('runInstall');
    if (runInstall) {
      this.installDependencies({
        npm: true,
        bower: false
      })
    }
  }
  
  end() {
    this.log(yosay('Before start working with project take a look at ' +
      chalk.green('README.md') + ' file in root folder!'));
  }
};