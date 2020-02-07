(function(win,doc) {
  'use strict';

  var $input = doc.querySelector('[data-js="input"]');
  var $digits = doc.querySelectorAll('[data-js="digit"]');
  var $operator = doc.querySelectorAll('[data-js="operator"]');
  var $buttonCalcular = doc.querySelector('[data-js="calcular"]');
  var progress; 


  $buttonCalcular.addEventListener('click',
      function(event) {
        event.preventDefault();
        calc();
  },false);
          
  $digits.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();                  
      $input.value += this.value;            
    },false);
  });

  $operator.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      setOperation(this.value);      
    },false);
  })     
  
  var operator = {
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

  

  function chooseOperation(symbol) {
      return operator[symbol];
  }

  function setOperation(oper) {
      
    if(progress !== undefined && $input.value === '') {    
      progress.operation = chooseOperation(oper);
        return;
    }

    var progress = {
      value1: Number($input.value),
      operator: oper,
      operation: chooseOperation(oper),
      value2: null,
      exec: function exec() {
          return this.operation(value1,value2);
      }
    };

    $input.value = '';
  }

  function calc() {    
    console.log(progress);
    $input.value = progress.exec();
  }

  function reset() {
    $input = '';
    progress = null;
  }

})(window,document);
