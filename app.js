"use strict";

const SMALL_SIZE = {
  price: 50,
  callories: 20,
};

const MIDDLE_SIZE = {
  price: 75,
  callories: 30,
};

const BIG_SIZE = {
  price: 100,
  callories: 40,
};

const ADD_CHEESE = {
  price: 10,
  callories: 20,
};

const ADD_SALAD = {
  price: 20,
  callories: 5,
};

const ADD_POTATOES = {
  price: 15,
  callories: 10,
};

const ADD_SEASONING = {
  price: 15,
  callories: 0,
};

const ADD_MAYONNAISE = {
  price: 20,
  callories: 5,
};

function Hamburger(sizeBurger) {
  this.burgerInformation = sizeBurger;
  this.allToppings = [];
}

Hamburger.prototype.addTopping = function (topping) {
  this.allToppings.push(topping);
};

Hamburger.prototype.getPrice = function () {
  return this.allToppings.reduce((totalPrice, currentPrice) => (totalPrice += currentPrice.price), this.burgerInformation.price);
};

Hamburger.prototype.getCallories = function () {
  return this.allToppings.reduce((totalCallories, currentCallories) => (totalCallories += currentCallories.callories), this.burgerInformation.callories);
};