(function(win,doc) {
  'use strict';

  var $input = doc.querySelector('[data-js="input"]');
  var $digits = doc.querySelectorAll('[data-js="digit"]');
  var $operator = doc.querySelectorAll('[data-js="operator"]');
  var $buttonCalcular = doc.querySelector('[data-js="calcular"]');

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
          alert('Impossível divisão por zero');
          progress = null;
        }        

        return x / y;
    },
    '%': function mod(x,y) {
        return x % y;
    }
  };

  var progress = {
    value1: 0,
    operator: null,    
    value2: null,
    exec: function exec() {
        var functionMath  = chooseOperation(this.operator);
        var result =  functionMath(this.value1, this.value2);
        this.value1  = result; 
        return result;         
    }
  };

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
  

  function chooseOperation(symbol) {
      return operator[symbol];
  }

  function setOperation(oper) {
    progress.value1  = Number($input.value);
    progress.operator = oper;   
    $input.value = "";
  }


  function calc() {     
    //Corrigir   
    if(Number($input.value) !== Number(progress.value1)) {
        progress.value2 = Number($input.value)
    }
      $input.value = progress.exec();
  }
})(window,document);
