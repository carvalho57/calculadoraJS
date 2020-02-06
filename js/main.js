(function(win,doc) {
  'use strict';

  var $digits = doc.querySelectorAll('[data-js="digit"]');
  var $operator = doc.querySelectorAll('[data-js="operator"]');
  var $input = doc.querySelector('data-js="input"');

 $digits.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      alert(this.value);
    },false);
 });

 $operator.forEach(function (element) {
   element.addEventListener('click', function (event) {
      event.preventDefault();
      alert(this.value);
   },false);
 })

  var operation = {
    '+': function soma(x,y) {
        return x + y;
    },
    '-': function subtracao(x,y) {
        return x - y;
    },
    '*': function multiplicacao(x,y) {
        return x * y;
    },
    '/': function divisao(x,y) {
        if(y === 0) {
          return null;
        }        

        return x / y;
    },
    '%': function mod(x,y) {
        return x % y;
    }
  };

  function chooseOperation(operator) {
      return operation[operator];
  }





})(window,document);
