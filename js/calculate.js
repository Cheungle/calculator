$(document).ready(function() {
  var displayBox = document.getElementById("display");
  var hasEvaluated = false;
  var myrecord = [];

  $("#plus_minus").click(function() {
    if(!hasEvaluated){
      var last = myrecord[myrecord.length-1];
      myrecord.pop();
      if (Number(displayBox.innerHTML) >= 0) {
        console.log(Number(displayBox.innerHTML));
        displayBox.innerHTML = "-" + displayBox.innerHTML; 
        last = "(-" + last + ")";
        myrecord.push(last);
      } else {
        displayBox.innerHTML = displayBox.innerHTML.replace("-", "");
        last = last.replace("(-","");
        last = last.replace(")","")
        myrecord.push(last);
      }
    }
    else {
      if (Number(displayBox.innerHTML) >= 0) {
        console.log(Number(displayBox.innerHTML));
        displayBox.innerHTML = "-" + displayBox.innerHTML; 
        var last = "(" + displayBox.innerHTML + ")";
      } else {
        displayBox.innerHTML = displayBox.innerHTML.replace("-", "");
        var last = displayBox.innerHTML;
    }
    hasEvaluated = false;
    myrecord = [];
    myrecord.push(last);
    }
  });

  //clear
  $("#calu-func").click(function() {
    displayBox.innerHTML = "0";
    myrecord = [];
    $("button").prop("disabled", false);
  });
  //input numbers
  $(".btn-num").click(function(){
    checkLength(displayBox.innerHTML);
    var num = $(this).val();
   //console.log(num);
    clickNumbers(num);
  });
 
  $("#decimal").click(function() {
    var string = displayBox.innerHTML;
    var num = string.length-1;
    if (string.indexOf(".") === -1 )
    {
      clickNumbers(".");
    }
  });

  //operation
  $("#add").click(function() {
    var res = evaluate();
    displayBox.innerHTML = res;
    checkLength(displayBox.innerHTML);
    console.log(res);
    console.log(typeof(myrecord));
    myrecord.push("+");
    console.log(myrecord);
  });
  $("#subtract").click(function() {
    var res = evaluate();
    displayBox.innerHTML = res;
    checkLength(displayBox.innerHTML);
    myrecord.push("-");
  });
  $("#multiply").click(function() {
    priority("×");
  });
  $("#divide").click(function() {
    priority("÷");
  });
  $("#percent").click(function() {
    var num = Number(displayBox.innerHTML);
    num = num * 0.01;
    if(!hasEvaluated){
      myrecord.pop();
      myrecord.push(num.toString());
    }
    else {
      myrecord = [];
      myrecord.push(num.toString());
    }
    checkLength(num);
    displayBox.innerHTML = num;
    if(!isNaN(num))hasEvaluated = false;
    console.log(hasEvaluated);
  });
  $("#back").click(function() {
    var string = (displayBox.innerHTML);
    num = string.length;
    if(num > 1 && string !== "NaN" && string !== "Undefined" && string !== "Infinity"){
      displayBox.innerHTML = string.substring(0,num-1);
      myrecord.pop();
      myrecord.push(displayBox.innerHTML);
      if(hasEvaluated) {
        myrecord = [];
        hasEvaluated = false;
        displayBox.innerHTML = 0;
      }
    }
    else {
      displayBox.innerHTML = 0;
      myrecord = [];
      hasEvaluated = false;
    }
  });
  $('#equals').click(function() {
    var formula = myrecord.toString();
    formula = formula.replace(/,/g,"");
  	var res = evaluate();
    displayBox.innerHTML = res;
    hasEvaluated = true;
    var string = "<p>"+formula+"="+displayBox.innerHTML+"</p>";
		$(".record").append(string);
  });
  //input numbers
  function clickNumbers(val) {
    var length = myrecord.length;
    console.log(myrecord[length-1]);
    if (displayBox.innerHTML === "0" || displayBox.innerHTML === "NaN" || displayBox.innerHTML === "Undefined" || displayBox.innerHTML === "Inifity" ||
         (hasEvaluated == true && !isNaN(displayBox.innerHTML)) || 
         myrecord[length-1] === "+" || myrecord[length-1] === "-" || myrecord[length-1] === "×" || myrecord[length-1] === "÷"){
          if((hasEvaluated ==true && !isNaN(myrecord[length-1])) || myrecord[length-1] === "Infinity"|| myrecord[length-1] === "NaN" || myrecord[length-1] === "Undefined") 
          {myrecord = [];hasEvaluated = false}
      displayBox.innerHTML = val;
      console.log(val);
      myrecord.push(val);
      } else {
      displayBox.innerHTML += val;
      myrecord.pop();
      myrecord.push(displayBox.innerHTML);
      }
    console.log(myrecord);
    hasEvaluated = false;
  }
  //eval
  function evaluate() {
    var formula = myrecord.toString();
    formula = formula.replace(/,/g,"");
    //console.log(formula);
    formula = formula.replace(/×/g, "*");
    formula = formula.replace(/÷/g, "/");
    console.log(formula);
    if (formula.indexOf("/0") !== -1) {
      $("button").attr("disabled", false);
      $(".calu-func").attr("disabled", false);
      displayBox.innerHTML = "Undefined";
      return "Undefined";
    }
    else{
      var evaluate = eval(formula);
      var num = evaluate.toString().length;
      var pointNum = evaluate.toString().indexOf(".");
      //console.log(num);
      //console.log(evaluate);
      if ( pointNum !== -1 && num > pointNum + 5 ) {
      evaluate = evaluate.toFixed(5);
      }
      checkLength(evaluate);
      return evaluate;
    } 
  }

  //check number length,can't calculate large numbers 
  function checkLength(num) {
    if (num.toString().length > 12) {
      $("button").attr("disabled", true);
      $(".calu-func").attr("disabled", false);
    }
  }
  //check * and / priority in calculating
  //firstly,show the result of * and /
  function priority(symbol){
    var length = myrecord.length;
    if(myrecord[length-2] === "+" || myrecord[length-2] === "-" ){
      displayBox.innerHTML = myrecord[length-1];
      checkLength(displayBox.innerHTML);
      myrecord.push(symbol);
    }
    else{
      if( myrecord.indexOf("+") === -1 && myrecord.indexOf("-") === -1){
        var res = evaluate();
        console.log(res);      
      }
      else{
        var lastAdd = myrecord.lastIndexOf("+");
        var lastSub = myrecord.lastIndexOf("-");
        var max = Math.max(lastAdd,lastSub);
        var index = max + 1;
        var string = myrecord.slice(index,length).toString();
        string = string.replace(/,/g,"");
        string = string.replace(/×/g,"*");
        string = string.replace(/÷/g,"/");
        console.log(string);
        var res = eval(string);
      }
      displayBox.innerHTML = res;
      checkLength(displayBox.innerHTML);
      myrecord.push(symbol);
    }
  }
  //以上为易慧婕
});
