$(document).ready(function() {
  var displayBox = document.getElementById("display");
  var hasEvaluated = false;

  //input numbers
  function clickNumbers(val) {
    if (displayBox.innerHTML === "0" || (hasEvaluated == true && !isNaN(displayBox.innerHTML)) || displayBox.innerHTML === "NaN" ||displayBox.innerHTML === "Undefined") {
      displayBox.innerHTML = val;
    } else {
      displayBox.innerHTML += val;
    }
    hasEvaluated = false;
  }

  $("#plus_minus").click(function() {
    if (eval(displayBox.innerHTML) > 0) {
      displayBox.innerHTML = "-" + displayBox.innerHTML;
    } else {
      displayBox.innerHTML = displayBox.innerHTML.replace("-", "");
    }
  });

  //clear
  $("#calu-func").click(function() {
    displayBox.innerHTML = "0";
    $("button").prop("disabled", false);
  });
  //input
  $("#one").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(1);
  });
  $("#two").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(2);
  });
  $("#three").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(3);
  });
  $("#four").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(4);
  });
  $("#five").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(5);
  });
  $("#six").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(6);
  });
  $("#seven").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(7);
  });
  $("#eight").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(8);
  });
  $("#nine").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(9);
  });
  $("#zero").click(function() {
    checkLength(displayBox.innerHTML);
    clickNumbers(0);
  });
  $("#decimal").click(function() {
    var string = displayBox.innerHTML;
    var num = string.length-1;
    if (string.indexOf(".") === -1 ||
    (string.indexOf(".") !== -1 && string.indexOf("+") !== -1  && string.indexOf(".") !== num ) ||
    (string.indexOf(".") !== -1 && string.indexOf("-") !== -1  && string.indexOf(".") !== num ) ||
    (string.indexOf(".") !== -1 && string.indexOf("×") !== -1  && string.indexOf(".") !== num ) ||
    (string.indexOf(".") !== -1 && string.indexOf("÷") !== -1  && string.indexOf(".") !== num ))
    {
      clickNumbers(".");
    }
  });

  //operation
  $("#add").click(function() {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "+";
  });
  $("#subtract").click(function() {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "-";
  });
  $("#multiply").click(function() {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "×";
  });
  $("#divide").click(function() {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "÷";
  });
  $("#percent").click(function() {
    var num = Number(displayBox.innerHTML);
    num = num * 0.01;
    checkLength(num);
    displayBox.innerHTML = num;
  });
  $("#back").click(function() {
    var string = (displayBox.innerHTML);
    num = string.length;
    if(num > 1 && string !== "NaN")
    displayBox.innerHTML = string.substring(0,num-1);
    else displayBox.innerHTML = 0;
  });
  $('#equals').click(function() {
  	evaluate();
  	hasEvaluated = true;
  });

  //eval
  function evaluate() {
    displayBox.innerHTML = displayBox.innerHTML.replace("×", "*");
    displayBox.innerHTML = displayBox.innerHTML.replace("÷", "/");
    if (displayBox.innerHTML.indexOf("/0") !== -1) {
      $("button").prop("disabled", false);
      $(".calu-func").attr("disabled", false);
      displayBox.innerHTML = "Undefined";
    }
    var evaluate = eval(displayBox.innerHTML);
    var num = evaluate.toString().length;
    var pointNum = evaluate.toString().indexOf(".");
    if ( pointNum !== -1 && num > pointNum + 5 ) {
      evaluate = evaluate.toFixed(5);
    }
    checkLength(evaluate);
    displayBox.innerHTML = evaluate;
  }

  //check number length
  function checkLength(num) {
    if (num.toString().length > 16) {
      num = "Infinity";
      $("button").prop("disabled", true);
      $(".calu-func").attr("disabled", false);
    }
  }
  //以上为易慧婕
});
