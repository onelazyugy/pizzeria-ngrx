# Pizzeria

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
PROD BUILD: 

$ ng build --prod

DEV BUILD:

ng build --configuration=dev

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

tsconfig.json -- set fullTemplateTypeCheck to false

## RUN dist/ folder
make sure you install:<br>
sudo npm install http-server -g <br>
npx http-server dist/pizzeria
http://192.168.1.76:8080

## How to update 
```$ ng update```<br />
```ex: $ ng update @angular/cli @angular/core ng-zorro-antd rxjs```

## Error I face with packages and angular 9+
-Error: Failed to compile entry-point angular-font-awesome (es2015 as esm2015) due to compilation errors:
-Solution: ```$ ng add @fortawesome/angular-fontawesome```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Example/References on angular flex layout
- ```https://github.com/angular/flex-layout/wiki/fxFlex-API```
- ```https://medium.com/angular-in-depth/angular-flex-layout-flexbox-and-grid-layout-for-angular-component-6e7c24457b63```

## Deploy to heroku
- ```$ heroku create pizzeria-ui```
- ```$ npm install --save express path```
- create a `server.js` file under root directory
- look at the `server.js` for its content
- update package.json file under the `scripts` and `engines` objects as follow
    - ```"scripts": {"postinstall": "ng build --aot --prod", "start": "node server.js"}```
    - the above has 'start' and 'postinstall' properties 
    - ```"engines": {"node": "~8.15.1","npm": "~6.4.1"}```
    - *note: node version must be capatible with angular
- note: ```"heroku-postbuild": "ng build --configuration=production"``` will build for prod using `envrionment.prod.ts`
- final package.json file might look like below:
```{
  "name": "pizzeria",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "node server.js",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "heroku-postbuild": "ng build --configuration=production"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~9.1.11",
    "@angular/cdk": "^9.2.4",
    "@angular/common": "^9.1.11",
    "@angular/compiler": "~9.1.11",
    "@angular/core": "~9.1.11",
    "@angular/flex-layout": "^9.0.0-beta.31",
    "@angular/forms": "~9.1.11",
    "@angular/platform-browser": "~9.1.11",
    "@angular/platform-browser-dynamic": "~9.1.11",
    "@angular/router": "~9.1.11",
    "@fortawesome/angular-fontawesome": "^0.6.1",
    "@fortawesome/fontawesome-svg-core": "^1.2.28",
    "@fortawesome/free-solid-svg-icons": "^5.13.0",
    "@ngrx/effects": "^9.2.0",
    "@ngrx/store": "^9.2.0",
    "express": "^4.17.1",
    "font-awesome": "^4.7.0",
    "lodash": "^4.17.15",
    "ng-zorro-antd": "^9.2.1",
    "path": "^0.12.7",
    "rxjs": "~6.5.5",
    "tslib": "^1.10.0",
    "zone.js": "~0.10.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.901.8",
    "@angular/cli": "~9.1.8",
    "@angular/compiler-cli": "~9.1.11",
    "@angular/language-service": "~9.1.11",
    "@ngrx/store-devtools": "^9.2.0",
    "@types/jasmine": "~3.3.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/node": "^12.11.1",
    "codelyzer": "^5.1.2",
    "jasmine-core": "~3.4.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~4.1.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~2.0.1",
    "karma-jasmine-html-reporter": "^1.4.0",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.15.0",
    "typescript": "^3.6.5"
  },
  "engines": {
    "node": "~13.7.0",
    "npm": "~6.4.1"
  }
}
- source: https://codemeals.com/angular-tutorials/deploy-angular-7-app-to-heroku