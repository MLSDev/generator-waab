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

#### Using variables in `stylus`

Use file `variables.styl` in `src/styles` for storing stylus variables and mixins. It should be imported only in `main.styl`. In component styles it's imported in loader configs.   

#### Including styles from `node_modules`

Just import it in `index.ts`. Use absolute path:

`import "module_name_from_node_modules/path_to_styles/styles.css"`

#### Images in styles and templates

Loaders will move images from `src/public` folder to `dist/public` and change path in files, where image is included.

For correct images loading, use relative path, from file where image is included.

Examples:
* Including images in stylesheets: `background: url(../../public/images/logo.png)`
* Including images in pug templates: `img(src=require('../../public/images/logo.png))`

#### APP constants

Configuration constants which are available in app:
* `ENV` - environment variable (string)
* `APP_CONST` - application constants (object)

`ENV` - is set from npm scripts

`APP_CONST` - this object is a copy of `appConstants` object in environment config file `configs/app/*.js`

Usage example:

```
class YourClass {
  someMethod() {
    console.log(ENV);
    console.log(APP_CONST);
    console.log(APP_CONST['api']);
  }
}
```

 In config file `configs/constants/*.js`, `template` object holds configuration constants for template `index.html`. For example, to output `basePath` parameter just write`<%= htmlWebpackPlugin.options.constants.basePath %>` in template.      

#### Build Features
 * `dist` - destination folder for compiled builds
 * `src/app` - all application files should be located here (except static files and global styles)
 * `src/app/vendor` - vendor custom libraries and scripts should be located here
 * `src/styles/vendor` - vendor css files (like bootstrap themes) should be located here
 * files from `vendor` folders (styles and scripts) will be exported to separate file
 * when running `staging` and `production` builds, all files will have their unique `chunkid` for better performance 
 * `webpack-dev-server` is used for local developing
