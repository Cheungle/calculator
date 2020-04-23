/**
 韩亚楠-进制转换  
 */
$(document).ready(function() {
    var displayBox = document.getElementById("display");
    
  //clear
    $("#calu-func").click(function() {
      displayBox.innerHTML = "0";
      $("button").prop("disabled", false);
    });
  
    $("#back").click(function() {
        var string = displayBox.innerHTML;
        var num = string.length;
        if(string.charAt(num-1) == ")") {
            if(num <= 4) displayBox.innerHTML = "0";
            if(num >= 7)  displayBox.innerHTML = string.substring(0,string.lastIndexOf("("));
        }
        if(num > 1 && string.charAt(num-1) != ")") {
            displayBox.innerHTML = string.substring(0,num-1);
        }
    });
    
    $("#plus_minus").click(function() {
        var string = displayBox.HTML;
        if (string.chatAt(string.IndexOf(")")+1) != "-") {
            string = string.substring(0,string.IndexOf(")")+1) + "-" + string.substring(string.IndexOf(")")+1);
            checkLength(string);
            displayBox.innerHTML = string;
        } else {
            string = string.replace("-", "");
            checkLength(string);
            displayBox.innerHTML = string;
        }
    });
  
    $("#decimal").click(function() {
        string = displayBox.innerHTML;
        if(string.charAt(string.length-1) == ")" || 
        (string.charAt(string.length-1) != ")" && string.charAt(string.length-1) != "." && string.length > 1)) {
            string += ".";
            checkLength(string);
            displayBox.innerHTML = string;
        }
    });
    
  //input numbers and letters
  function clickNumbers(val) {
      var string = displayBox.innerHTML;
      if(string.charAt(string.indexOf("(")+1) != string.charAt(string.indexOf(")")-1)) {
        var substring1 = Number(string.charAt(string.indexOf("(")+1) + string.charAt(string.indexOf(")")-1));
      }else{
          var substring1 = Number(string.charAt(string.indexOf("(")+1));
      }
      if(Number(val) < substring1) {
          string += val;
          checkLength(string);
          displayBox.innerHTML = string;
      }else{
          displayBox.innerHTML = "Invalid";
          $("button").prop("disabled", true);
          $(".calu-func").attr("disabled", false);
      }
  }
  
  function clickLetters(val) {
      var string = displayBox.innerHTML;
      if(string.charAt(string.indexOf("(")+1) != string.charAt(string.indexOf(")")-1)) {
        var substring1 = Number(string.charAt(string.indexOf("(")+1) + string.charAt(string.indexOf(")")-1));
      }else{
          var substring1 = Number(string.charAt(string.indexOf("(")+1));
      }
      if(substring1 == 16){
          string += val;
          checkLength(string);
          displayBox.innerHTML = string;
      }else{
          displayBox.innerHTML = "Invalid";
          $("button").prop("disabled", true);
          $(".calu-func").attr("disabled", false);
      }
  }
  
  //numbers and letters
  $("#zero").click(function() {
      clickNumbers("0");
      });
  $("#one").click(function() {
      clickNumbers("1");
  });
  $("#two").click(function() {
      clickNumbers("2");
  });
  $("#three").click(function() {
      clickNumbers("3");
  });
  $("#four").click(function() {
      clickNumbers("4");
  });
  $("#five").click(function() {
      clickNumbers("5");
  });
  $("#six").click(function() {
      clickNumbers("6");
  });
  $("#seven").click(function() {
      clickNumbers("7");
  });
  $("#eight").click(function() {
      clickNumbers("8");
  });
  $("#nine").click(function() {
      clickNumbers("9");
  });
  $("#A").click(function() {
      clickLetters("A");
  });
  $("#B").click(function() {
      clickLetters("B");
  });
  $("#C").click(function() {
      clickLetters("C");
  });
  $("#D").click(function() {
      clickLetters("D");
  });
  $("#E").click(function() {
      clickLetters("E");
  });
  $("#F").click(function() {
      clickLetters("F");
  });
  
  //operation
  $("#binary").click(function() {
    var string = displayBox.innerHTML;
    if (string === "0") {
        string = "(2)";
        displayBox.innerHTML = string;
    }else if(string.charAt(string.length-1) != ")") {
        string += "(2)";
        checkLength(string);
        displayBox.innerHTML = string;
    }
  });
  $("#octonary").click(function() {
        var string = displayBox.innerHTML;
        if (string === "0") {
            string = "(8)";
            displayBox.innerHTML = string;
        }else if(string.charAt(string.length-1) != ")") {
            string += "(8)";
            checkLength(string);
            displayBox.innerHTML = string;
        }
  });
  $("#decimalism").click(function() {
        var string = displayBox.innerHTML;
        if (string === "0") {
            string = "(10)";
            displayBox.innerHTML = string;
        }else if(string.charAt(string.length-1) != ")") {
            string += "(10)";
            checkLength(string);
            displayBox.innerHTML = string;
        }
  });
  $("#hecadecimal").click(function() {
        var string = displayBox.innerHTML;
        if (string === "0") {
            string = "(16)";
            displayBox.innerHTML = string;
        }else if(string.charAt(string.length-1) != ")") {
            string += "(16)";
            checkLength(string);
            displayBox.innerHTML = string;
        }
  });
  $('#equals').click(function() {
      evaluate();
  });
  
  //evaluate
  function evaluate() {
      var string = displayBox.innerHTML;
      if(string.charAt(string.indexOf("(")+1) != string.charAt(string.indexOf(")")-1)) {
        var sys1 = Number(string.charAt(string.indexOf("(")+1) + string.charAt(string.indexOf(")")-1));
      }else{
          var sys1 = Number(string.charAt(string.indexOf("(")+1));
      }
      if(string.charAt(string.lastIndexOf("(")+1) != string.charAt(string.lastIndexOf(")")-1)) {
        var sys2 = Number(string.charAt(string.lastIndexOf("(")+1) + string.charAt(string.lastIndexOf(")")-1));
      }else{
          var sys2 = Number(string.charAt(string.lastIndexOf("(")+1));
      }
      var number = string.substring(string.indexOf(")")+1, string.lastIndexOf("("));
    
      if (sys1 == sys2) {
          string = number;
      }
      if (sys1 == 10) {
          number = Number(number);
          string = number.toString(sys2);
      }
      if (sys2 == 10) {
          string = parseInt(number, sys1);
      }
      if (sys1 != 10 && sys2 != 10) {
          string = parseInt(number, sys1).toString(sys2);
      }
      
      checkLength(string);
      displayBox.innerHTML = string;
      $("button").prop("disabled", false);
      $(".calu-func").attr("disabled", false);
  }
  
  //check string length
  function checkLength(string) {
    if(string.length > 32) {
        displayBox.innerHTML = "Infinity";
        $("button").prop("disabled", true);
        $(".calu-func").attr("disabled", false);
    }
  }
  });