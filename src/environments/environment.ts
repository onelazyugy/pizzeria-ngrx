// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  registerUrl: 'http://localhost:8282/pizzeria/api/v1/user/register',
  loginUrl: 'http://localhost:8282/pizzeria/api/v1/user/login',
  addWingToCartUrl: 'http://localhost:8282/pizzeria/api/v1/cart/add/wing',
  addPizzaToCartUrl: 'http://localhost:8282/pizzeria/api/v1/cart/add/pizza',
  removeItemFromCartUrl: 'http://localhost:8282/pizzeria/api/v1/cart/remove',
  retrieveCartUrl: 'http://localhost:8282/pizzeria/api/v1/cart/retrieve',
  retrieveTotalItemInCartUrl: 'http://localhost:8282/pizzeria/api/v1/cart/retrieve?isGetCountOnly=true',
  updateItemFromCartUrl: 'http://localhost:8282/pizzeria/api/v1/cart/update'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
