'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('waab:app', function () {
  describe('default', function () {
    before(function (done) {
      helpers
        .run(path.join(__dirname, '../app'))
        .on('end', done)
    });

    it('creates files', function () {
      assert.file([
        'package.json',
        '.gitignore',
        'README.md',
        'CHANGELOG.md',
        'global-typings.d.ts',
        'karma.conf.js',
        'tsconfig.json',
        'tsconfig.webpack.json',
        'tslint.json',
        'webpack.config.js',
        'src/index.ejs',
        'src/index.ts',
        'src/styles/main.styl',
        'src/meta/develop.txt',
        'src/meta/local.txt',
        'src/meta/production.txt',
        'src/meta/staging.txt',
        'src/app/app.component.pug',
        'src/app/app.component.ts',
        'src/app/app.module.ts',
        'src/app/app.routes.ts',
        'src/app/polyfills.ts',
        'src/app/home/home.component.pug',
        'src/app/home/home.component.ts',
        'src/app/core/core.module.ts',
        'src/app/core/header/header.component.pug',
        'src/app/core/header/header.component.styl',
        'src/app/core/header/header.component.ts',
        'src/app/core/footer/footer.component.pug',
        'src/app/core/footer/footer.component.ts'
      ])
    });

    it('adds default value for name in generated package.json', function () {
      assert.fileContent('package.json', /name": "test-app"/)
    })
  });

  describe('with prompt actions', function () {
    before(function (done) {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({appName: 'FooAppName'})
        .on('end', done)
    });

    it('creates files', function () {
      assert.file([
        'package.json',
        '.gitignore',
        'README.md',
        'CHANGELOG.md',
        'global-typings.d.ts',
        'karma.conf.js',
        'tsconfig.json',
        'tsconfig.webpack.json',
        'tslint.json',
        'webpack.config.js',
        'src/index.ejs',
        'src/index.ts',
        'src/styles/main.styl',
        'src/meta/develop.txt',
        'src/meta/local.txt',
        'src/meta/production.txt',
        'src/meta/staging.txt',
        'src/app/app.component.pug',
        'src/app/app.component.ts',
        'src/app/app.module.ts',
        'src/app/app.routes.ts',
        'src/app/polyfills.ts',
        'src/app/home/home.component.pug',
        'src/app/home/home.component.ts',
        'src/app/core/core.module.ts',
        'src/app/core/header/header.component.pug',
        'src/app/core/header/header.component.styl',
        'src/app/core/header/header.component.ts',
        'src/app/core/footer/footer.component.pug',
        'src/app/core/footer/footer.component.ts'
      ])
    });

    it('adds prompted value "foo-app-name" for name in generated package.json', function () {
      assert.fileContent('package.json', /name": "foo-app-name"/)
    })
  })
})
