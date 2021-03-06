export const environment = {
  production: true,
  registerUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/user/register',
  loginUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/user/login',
  addWingToCartUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/cart/add/wing',
  addPizzaToCartUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/cart/add/pizza',
  removeItemFromCartUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/cart/remove',
  retrieveCartUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/cart/retrieve',
  retrieveTotalItemInCartUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/cart/retrieve?isGetCountOnly=true',
  updateItemFromCartUrl: 'https://pizzeria-backend.herokuapp.com/pizzeria/api/v1/cart/update'
};