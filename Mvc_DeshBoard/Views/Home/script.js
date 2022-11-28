// Code goes here

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('MyController', MyController);

function MyController($scope) {

  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.meals = [];

  var dishes = [
    'noodles',
    'sausage',
    'beans on toast',
    'cheeseburger',
    'battered mars bar',
    'crisp butty',
    'yorkshire pudding',
    'wiener schnitzel',
    'sauerkraut mit ei',
    'salad',
    'onion soup',
    'bak choi',
    'avacado maki'
  ];
  var sides = [
    'with chips',
    'a la king',
    'drizzled with cheese sauce',
    'with a side salad',
    'on toast',
    'with ketchup',
    'on a bed of cabbage',
    'wrapped in streaky bacon',
    'on a stick with cheese',
    'in pitta bread'
  ];
  for (var i = 1; i <= 100; i++) {
    var dish = dishes[Math.floor(Math.random() * dishes.length)];
    var side = sides[Math.floor(Math.random() * sides.length)];
    $scope.meals.push('meal ' + i + ': ' + dish + ' ' + side);
  }
}

function OtherController($scope) {
  
  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
}

function ThirdController($scope) {
  
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.drinks = [];
  
  var drinks = [
    'coke',
    'melange',
    'chai latte',
    'almdudler',
    'beer',
    'vodka',
    'coconut milk',
    'orange juice',
    'wine',
    'whisky',
    'sex on the beach'
  ];
  for (var i = 1; i <= 20; i++) {
    var drink = drinks[Math.floor(Math.random() * drinks.length)];
    $scope.drinks.push('drink ' + i + ': ' + drink);
  }
  
  $scope.pageChangeHandler = function(num) {
      console.log('drinks page changed to ' + num);
  };
}