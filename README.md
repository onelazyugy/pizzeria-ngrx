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