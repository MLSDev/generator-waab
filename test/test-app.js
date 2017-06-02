'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('waab:app', function () {
  describe('default', function () {
    before(function (done) {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({filesToUpdate: ['constants', 'configs', 'src', 'basic', 'assets']})
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
        'config/base.js',
        'config/app/local.js',
        'config/app/develop.js',
        'config/app/staging.js',
        'config/app/production.js',
        'config/builder/local.js',
        'config/builder/develop.js',
        'config/builder/staging.js',
        'config/builder/production.js',
        'config/builder/styles-loader/css-export.js',
        'config/builder/styles-loader/stylus-export.js',
        'config/test/karma.conf.js',
        'config/test/spec-bundle.js',
        'config/test/webpack.test.js',
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

    it('pastes default project name in generated files', function () {
      assert.fileContent('package.json', /name": "test-app"/);
      assert.fileContent('README.md', /testApp/);
      assert.fileContent('src/app/app.component.ts', /testApp/);
    })
  });

  describe('with prompt actions', function () {

    describe('set appName', function () {

      before(function (done) {
        helpers
          .run(path.join(__dirname, '../app'))
          .withPrompts({
            appName: 'FooAppName',
            filesToUpdate: ['constants', 'configs', 'src', 'basic', 'assets']
          })
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
          'config/base.js',
          'config/app/local.js',
          'config/app/develop.js',
          'config/app/staging.js',
          'config/app/production.js',
          'config/builder/local.js',
          'config/builder/develop.js',
          'config/builder/staging.js',
          'config/builder/production.js',
          'config/builder/styles-loader/css-export.js',
          'config/builder/styles-loader/stylus-export.js',
          'config/test/karma.conf.js',
          'config/test/spec-bundle.js',
          'config/test/webpack.test.js',
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

      it('pastes prompted app name "FooAppName" in generated files', function () {
        assert.fileContent('package.json', /name": "foo-app-name"/);
        assert.fileContent('README.md', /FooAppName/);
        assert.fileContent('src/app/app.component.ts', /FooAppName/);
      })
    });
    
    describe('select only "constants" option in "filesToUpdate"', function () {

      before(function (done) {
        helpers
          .run(path.join(__dirname, '../app'))
          .withPrompts({filesToUpdate: ['constants']})
          .on('end', done)
      });

      it('creates files', function () {
        assert.file([
          'config/app/local.js',
          'config/app/develop.js',
          'config/app/staging.js',
          'config/app/production.js'
        ])
      });
      it('does not create files', function () {
        assert.noFile([
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
          'config/base.js',
          'config/builder/local.js',
          'config/builder/develop.js',
          'config/builder/staging.js',
          'config/builder/production.js',
          'config/builder/styles-loader/css-export.js',
          'config/builder/styles-loader/stylus-export.js',
          'config/test/karma.conf.js',
          'config/test/spec-bundle.js',
          'config/test/webpack.test.js',
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
      })
    });

    describe('select only "configs" option in "filesToUpdate"', function () {

      before(function (done) {
        helpers
          .run(path.join(__dirname, '../app'))
          .withPrompts({filesToUpdate: ['configs']})
          .on('end', done)
      });

      it('creates files', function () {
        assert.file([
          'config/base.js',
          'config/builder/local.js',
          'config/builder/develop.js',
          'config/builder/staging.js',
          'config/builder/production.js',
          'config/builder/styles-loader/css-export.js',
          'config/builder/styles-loader/stylus-export.js',
          'config/test/karma.conf.js',
          'config/test/spec-bundle.js',
          'config/test/webpack.test.js',
          'global-typings.d.ts',
          'karma.conf.js',
          'tsconfig.json',
          'tsconfig.webpack.json',
          'tslint.json',
          'webpack.config.js'
        ])
      });
      it('does not create files', function () {
        assert.noFile([
          'package.json',
          '.gitignore',
          'README.md',
          'CHANGELOG.md',
          'config/app/local.js',
          'config/app/develop.js',
          'config/app/staging.js',
          'config/app/production.js',
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
      })
    });

    describe('select only "src" option in "filesToUpdate"', function () {

      before(function (done) {
        helpers
          .run(path.join(__dirname, '../app'))
          .withPrompts({filesToUpdate: ['src']})
          .on('end', done)
      });

      it('creates files', function () {
        assert.file([
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
      it('does not create files', function () {
        assert.noFile([
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
          'config/base.js',
          'config/app/local.js',
          'config/app/develop.js',
          'config/app/staging.js',
          'config/app/production.js',
          'config/builder/local.js',
          'config/builder/develop.js',
          'config/builder/staging.js',
          'config/builder/production.js',
          'config/builder/styles-loader/css-export.js',
          'config/builder/styles-loader/stylus-export.js',
          'config/test/karma.conf.js',
          'config/test/spec-bundle.js',
          'config/test/webpack.test.js'
        ])
      })
    });
    
    describe('select only "basic" option in "filesToUpdate"', function () {

      before(function (done) {
        helpers
          .run(path.join(__dirname, '../app'))
          .withPrompts({filesToUpdate: ['basic']})
          .on('end', done)
      });

      it('creates files', function () {
        assert.file([
          'package.json',
          '.gitignore',
          'README.md',
          'CHANGELOG.md'
        ])
      });
      it('does not create files', function () {
        assert.noFile([
          'global-typings.d.ts',
          'karma.conf.js',
          'tsconfig.json',
          'tsconfig.webpack.json',
          'tslint.json',
          'webpack.config.js',
          'config/base.js',
          'config/app/local.js',
          'config/app/develop.js',
          'config/app/staging.js',
          'config/app/production.js',
          'config/builder/local.js',
          'config/builder/develop.js',
          'config/builder/staging.js',
          'config/builder/production.js',
          'config/builder/styles-loader/css-export.js',
          'config/builder/styles-loader/stylus-export.js',
          'config/test/karma.conf.js',
          'config/test/spec-bundle.js',
          'config/test/webpack.test.js',
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
      })
    });
  })
});
