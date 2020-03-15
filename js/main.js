(function(win,doc) {
  'use strict';

  var $input = doc.querySelector('[data-js="input"]');
  var $digits = doc.querySelectorAll('[data-js="digit"]');
  var $operator = doc.querySelectorAll('[data-js="operator"]');
  var $buttonCalcular = doc.querySelector('[data-js="calcular"]');
  var $remove = doc.querySelector('[data-js="remove"]');
  var $CE = doc.querySelector('[data-js="CE"]');
  var $welcome = doc.querySelector('[data-js="welcome"]');
 
  $remove.addEventListener('click',() => {
    $input.value = $input.value.slice(0,-1);
    if($input.value === '') {
      reset();
    }

  },false);
  $CE.addEventListener('click',reset,false);

  win.addEventListener('load', handleWelcome,false);

  $buttonCalcular.addEventListener('click',
      function(event) {
        event.preventDefault();
        calc();
  },false);
          
  $digits.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();      
      if($input.value === '0') {
        $input.value = this.value;
        return;
      }        
          
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
    '+': function sum(x,y) {
        return x + y;
    },
    '-': function subtraction(x,y) {
        return x - y;
    },
    '*': function multiplication(x,y) {
        return x * y;
    },
    '/': function division(x,y) {
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

  let progress = {
    value1: 0,
    operator: null,    
    value2: null,
    setOperation: null,
    exec: function exec() {
        var functionMath  = chooseOperation(this.operator);
        var result =  functionMath(this.value1, this.value2);
        this.value1  = result; 
        return result;         
    }
  };

  function chooseOperation(symbol) {
      return operator[symbol];
  }

  function setOperation(oper) {
    progress.value1  = Number($input.value);
    progress.operator = oper;   
    $input.value = "";
    progress.setOperation = true;
  }


  function calc() {     
   
    if(progress.setOperation) {
        progress.value2 = Number($input.value)
    }
    $input.value = progress.exec();
    progress.setOperation = false;
  }

  function reset() {       
    $input.value = '';
    progress.value1 = 0;
    progress.operator = null;
    progress.value2 = null;
    progress.setOperation = null;
  }

  function handleWelcome() {
      timer(3);
  }

  function timer(number) {
      if(number === -1) {
        $welcome.textContent = "Bem - Vindo a Calculadora JS";
        setTimeout(closeWelcome,2000);          
        return;
      }
      setTimeout(function() {          
        $welcome.textContent = number;
        timer(number - 1);          
      },1000);      
  }

  function closeWelcome() {
    var modal = doc.querySelector('[data-js="modal"]');
    modal.style.display = 'none';
  }
})(window,document);
