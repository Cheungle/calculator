/**
 韩亚楠-高级计算器  
 */
$(document).ready(function () {
    var displayBox = document.getElementById("display");
    var stanum = 0;
    var staarray = [];
    
    //clear
    $("#calu-func").click(function () {
        displayBox.innerHTML = "0";
        stanum = 0;
        staarray = [];
        $("button").attr("disabled", false);
    });
   
    $("#back").click(function () {
        var string = displayBox.innerHTML;
        console.log(string);
        var num = string.length;
        if (string.charAt(num - 1) == "=" || string.charAt(num - 2) == "=" || string == "0" ) {
            ;
        } 
        else {
            if (string === "NaN" || string === "Infinity" || string === "Undefined"){
                string = "0";
            }else{
                if (string.substring(num - 2) == "ln" || string.substring(num - 2) == "lg" || string.substring(num - 2) == "pi") {
                    string = string.substr(0, num - 2);
                    if(string == "") string = "0";
                }
                if (string.substring(num - 3) == "log" || string.substring(num - 3) == "sin" ||
                    string.substring(num - 3) == "cos" || string.substring(num - 3) == "tan") {
                    string = string.substr(0, num - 3);
                    if(string == "") string = "0";
                }
                if (string.substring(num - 6) == "arcsin" || string.substring(num - 6) == "arccos" ||
                    string.substring(num - 6) == "arctan") {
                    string = string.substr(0, num - 6);
                    if(string == "") string = "0";
                } else {
                    string = string.substr(0, num - 1);
                    if (num == 1) {
                        string = "0";
                    }
                }
            }
        }
        displayBox.innerHTML = string;
    });

    //numbers and letters
    $(".btn-num").click(function(){
        var num = $(this).val();
        clickNumbers(num);
    });
    //function and operation click
    $(".btn-func").click(function(){
        var func = $(this).val();
        clickMarks(func);
    });
    // btn M+
    $("#statistics").click(function () {
        var num = displayBox.innerHTML;
        if( !isNaN(num) || evaluate()){
            console.log(num);
            console.log(evaluate());
            stanum += 1;
            if(!isNaN(num)) staarray.push(Number(num));
            else staarray.push(evaluate());
            displayBox.innerHTML = "n=" + stanum.toString(); 
            var string = "<p> M"+ stanum + "=" + staarray[staarray.length-1] + "</p>";
		    $(".record").append(string);
        }
    });

    $("#plus_minus").click(function () {
        var content = displayBox.innerHTML;
        //console.log(content);
        if( !isNaN(content) && content !== "Infinity") {
            //console.log(content);
            if(Number(content) >= 0) {
                content = "(-" + content + ")";
                console.log(content);
            }
            else { 
                content = content.replace("(","");
                content = content.replace("-","");
                content = content.replace(")","");
            }
        }
        else{
            if( !isNaN(content.charAt(content.length-1)) ){
             var string = content.split("").reverse().join("");
             var index = string.search("[^\\d.]");
             index = content.length - index ;
             content = content.replace(content.substring(index),"(-"+content.substring(index)+")");
            }
            else {
                var string = content.split("").reverse().join("");
                string = string.substring(1);
                var index = string.search("[^\\d.]");
                index = string.length - index ;
                if(content.charAt(content.length-1) == ")" && content.charAt(index-1) == "-" && content.charAt(index-2) == "("){
                    content = content.replace(content.substring(index-2),content.substring(index,content.length-1)); 
                }
            }
        }
        checkLength(content);
        displayBox.innerHTML = content;
    });

    $("#decimal").click(function () {
        var string = displayBox.innerHTML;
        var stringReverse = string.split("").reverse().join("");
        console.log(stringReverse);
        var index = stringReverse.search("[^\\d.]");
        index = string.length - index ;
        console.log(index);
        if(( index <= string.length && string.indexOf(".",index) == -1) || (index > string.length && string.indexOf(".") == -1)){
            string = string + ".";
            checkLength(string);
            displayBox.innerHTML = string;
        }
    });

    //按数字，按m+，最后按操作直接输出结果
    $("#mean").click(function () {
        var outcome = 0;
        var temArray = staarray.concat();
        for (var i = 0; i < stanum; i++) {
            outcome += temArray.pop() / stanum;
            console.log(outcome);
        }
        clickMarks("mean=" + outcome.toString());
        $("button").attr("disabled", true);
        $(".calu-func").attr("disabled", false);
        $("#variance").attr("disabled", false);
    });
    $("#variance").click(function () {
        var mean = 0;
        var outcome = 0;
        var staarray1 = staarray.concat();
        console.log(staarray1);
        var temArray = staarray.concat();
        for (var i = 0; i < stanum; i++) {
            mean += temArray.pop() / stanum;
            console.log(mean);
        }
        for (var j = 0; j < stanum; j++) {
            var cnum = staarray1.pop() - mean;
            outcome += cnum * cnum / stanum;
        }
        console.log(outcome);
        clickMarks("variance=" + outcome.toString());
        $("button").attr("disabled", true);
        $(".calu-func").attr("disabled", false);
        $("#mean").attr("disabled", false);
    });
    //弧度化角度、角度化弧度（带有pi的识别为弧度）
    $("#rad").click(function () {
        var string = displayBox.innerHTML;
        if (!isNaN(string)){
            if (string.indexOf("p") == -1) {
                string = (Number(string) / 180).toString() + "*pi";
                checkLength(string);
                displayBox.innerHTML = string;
            } 
        }
        else {
            if( string.substring(string.length-3) == "*pi"){
                string = (Number(string.substring(0, string.indexOf("*"))) * 180).toString();
                checkLength(string);
                displayBox.innerHTML = string;
            }
        }
        $("button").prop("disabled", true);
        $(".calu-func").attr("disabled", false);
    });
    //提供一个0~1之间的随机数
    $("#rand").click(function () {
        var num = Math.random();
        clickMarks(num.toFixed(6));
    });

    $('#equals').click(function () {
        var formula = displayBox.innerHTML;
        var res = evaluate().toString();
        checkLength(res);
        displayBox.innerHTML = res;
        $("button").prop("disabled", false);
        $(".calu-func").attr("disabled", false);
        var string = "<p>"+ formula + "=" + displayBox.innerHTML + "</p>";
		$(".record").append(string);
    });

    function clickNumbers(val) {
        var string = displayBox.innerHTML;
        console.log(string);
        var length = string.length;
        if (string.charAt(length - 1) == "%" || (string.charAt(length - 1) == ")" && string.charAt(length - 2) != "y") ||
            string.charAt(length - 1) == "=" || string.charAt(length - 1) == "e" || string.charAt(length - 1) == "pi" ||
            string.charAt(length - 1) == "i" || string.charAt(length - 1) == "!" || string === "NaN" || string === "Inifity" || string === "Undefined") {
            ;
        } else {
            if( !isNaN(string.charAt(length-1)) && (val == "e" || val == "pi")){
                ;
            }else{
                if (string == "0" || string.substring(0, 2) == "n=") {
                    string = val;
                    displayBox.innerHTML = string;
                } else {
                    if (string.indexOf("y") != -1) {
                        string = string.replace("y", val);
                        displayBox.innerHTML = string;
                    } else {
                        if (string.substring(string.length - 3, string.length) == "log") {
                            string = string + val + ",";
                            checkLength(string);
                            displayBox.innerHTML = string;
                        } else {
                            if (string.indexOf("x") != -1) {
                                string = string.replace("x", val);
                                displayBox.innerHTML = string;
                            } else {
                                string += val;
                                checkLength(string);
                                displayBox.innerHTML = string;
                            }
                        }
                    }
                }
            }
        }
    }

    function clickMarks(val) {
        var string = displayBox.innerHTML;
        var num = string.length;
        if (string.substring(0, 2) == "n=" || string.substring(0, 5) == "mean=" || string.substring(0, 9) == "variance=") {
                string = val;
                checkLength(string);
                displayBox.innerHTML = string;    
        }
        if (!isNaN(string.charAt(num - 1)) || string.charAt(num - 1) == ")" ||
            string.charAt(num - 1) == "%" || string.charAt(num - 1) == "!" ||
            string.charAt(num - 1) == "e" || string.charAt(num - 1) == "i") {
            if (val.substring(0, 5) == "mean=" || val.substring(0, 9) == "variance=" || val == "ln" || val == "(" || val == "e^" ||
                val == "lg" || val == "sin" || val == "cos" || val == "tan" || val.substring(0, 3) == "arc" || val == "log" || val == "1/x") {
                if( !isNaN(string) && val == "1/x" && string !== "0"){
                    string = 1/Number(string);
                    checkLength(string);
                    displayBox.innerHTML = string;
                }
            } else {
                if (string == "0") {
                    if( val == "^" || val == "^2" || val == "^3" || val == "!" || val == "^(1/2)" || val == "^(1/3)" || val == "^(1/y)"){
                        string += val;
                        checkLength(string);
                        displayBox.innerHTML = string;
                    }
                    else{
                        string = val;
                        checkLength(string);
                        displayBox.innerHTML = string;
                    }
                } else {
                    string += val;
                    checkLength(string);
                    displayBox.innerHTML = string;
                }
            }
        }
        if (string.charAt(num - 1) == "+" || string.charAt(num - 1) == "-" || string.charAt(num - 1) == "*" ||
            string.charAt(num - 1) == "/" || string.charAt(num - 1) == "(" || string.charAt(num - 1) == "^" || string == "0") {
            if (val == "ln" || val == "lg" || val == "sin" || val == "cos" || val == "e^" ||
                val == "tan" || val.substring(0, 3) == "arc" || val == "(" || val == "log" || val == "1/x") {
                if (string == "0") {
                    string = val;
                    checkLength(string);
                    displayBox.innerHTML = string; 
                } else {
                    string += val;
                    checkLength(string);
                    displayBox.innerHTML = string;
                }
            }
        }
        if (string.substring(num-3) == "sin" || string.substring(num-3) == "cos" || 
            string.substring(num-3) == "tan" || string.substring(num-6,num-3) == "arc" ||
            string.charAt(num-1) == ","){
            if (val == "("){
                string += val;
                checkLength(string);
                displayBox.innerHTML = string; 
            }
        }
    }
    //evaluate,judge brackets and call function eval() to calculate
    function evaluate() {
        var string = displayBox.innerHTML;
        var num = string.length;
        var evarray = [];
        var leftBracket = 0;
        var rightBracket = 0;
        for (var i = 0; i < num; i++) {
            var item = string.charAt(i);
            if (item == "(") {
                evarray.push(item);
                leftBracket += 1;
            }
            if (item == ")") {
                if (evarray.length > 0) evarray.pop();
                rightBracket += 1;
            }
        }
        if (evarray.length !== 0 || rightBracket > leftBracket) {
            displayBox.innerHTML = "Invalid";
            $("button").prop("disabled", true);
            $(".calu-func").attr("disabled", false);
            return "Invalid";
        }
        //first calculate the content in brackets
        var indexLeft = string.indexOf("(");
        var indexRight = string.indexOf(")");
        var timesLeft = 0;
        var indexsLeft = [];
        var indexsRight = [];
        while(indexLeft !== -1){
            timesLeft = timesLeft + 1;
            indexsLeft.push(indexLeft);
            indexLeft = string.indexOf("(", indexLeft+1);
        }
        while(indexRight !== -1){
            indexsRight.push(indexRight);
            indexRight = string.indexOf(")", indexRight+1);
        }
        for(var i = 0; i<timesLeft;i++){
            var indexLeft = indexsLeft.pop();
            var indexRight = indexsRight.pop();
            var contentWithBra = string.substring(indexLeft, indexRight + 1);
            var contentBrackets = string.substring(indexLeft + 1, indexRight);
            if(isNaN(contentBrackets)) string = string.replace(contentWithBra, evalbra(contentBrackets));
        }
        string = evalbra(string);
        var outcome = eval(string);
        return outcome;
    }
    // function calculate 
    function evalbra(val) {
        var string = val + "#";
        var stringRes = "";
        var lastmark = -1;
        var num;
        console.log(string.length);
        console.log(string);
        for (var i = 0; i < string.length; i++) {
            item = string.charAt(i);
            //console.log(item);
            if (item == "+" || (item == "-" && string.charAt(i-1) !== "(") || item == "*" || item == "/" || item == "#") {
                var stringWithoutOpe = string.substring(lastmark + 1, i);
                //console.log(stringWithoutOpe);
                lastmark = i;
                if (stringWithoutOpe.indexOf("e") !== -1 ) {
                    stringWithoutOpe = stringWithoutOpe.replace(/e/g, Math.E); 
                }
                if (stringWithoutOpe.indexOf("pi") !== -1) {
                    stringWithoutOpe = stringWithoutOpe.replace(/pi/g, Math.PI);
                }
                if (stringWithoutOpe.indexOf("%") !== -1) {
                
                    num = stringWithoutOpe.substring(0, stringWithoutOpe.indexOf("%"));
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = 0.01 * num;
                    if (num < 0) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(0, stringWithoutOpe.indexOf("%") + 1), num.toString());
                }
                if (stringWithoutOpe.indexOf("!") != -1) {
                    num = Number(stringWithoutOpe.substring(0, stringWithoutOpe.indexOf("!")));
                    if (!isNaN(num)){
                        var res = 1;
                        if(num == 0 || num == 1) num = 1;
                        else {
                          for (var k = 1; k <= num; k++) {
                            res = res * k;
                          }
                          num = res;
                        }
                    }
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(0, stringWithoutOpe.indexOf("!") + 1), num.toString());
                }
                if (stringWithoutOpe.indexOf("^") != -1) {
                    num1 = stringWithoutOpe.substring(0, stringWithoutOpe.indexOf("^"));
                    if (num1.charAt(0) === "(") num1 = num1.substring(1,num1.length-1);
                    num2 = stringWithoutOpe.substring(stringWithoutOpe.indexOf("^") + 1);
                    if (num2.charAt(0) === "(") num2 = num2.substring(1,num2.length-1);
                    num = Math.pow(num1, num2);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe, num.toString());
                }
                if (stringWithoutOpe.indexOf("sin") != -1 && stringWithoutOpe.indexOf("arc") == -1) {
                    num = stringWithoutOpe.substring(stringWithoutOpe.indexOf("n") + 1);
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = Math.sin(num);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("s")), num.toString());
                }
                if (stringWithoutOpe.indexOf("cos") != -1 && stringWithoutOpe.indexOf("arc") == -1) {
                    num = stringWithoutOpe.substring(stringWithoutOpe.indexOf("s") + 1);
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = Math.cos(num);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("c")), num.toString());
                }
                if (stringWithoutOpe.indexOf("tan") != -1 && stringWithoutOpe.indexOf("arc") == -1) {
                    num = stringWithoutOpe.substring(stringWithoutOpe.indexOf("n") + 1);
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = Math.tan(num);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("t")), num.toString());
                }
                if (stringWithoutOpe.indexOf("arcsin") != -1) {
                    num = stringWithoutOpe.substring(stringWithoutOpe.indexOf("n") + 1);
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = Math.asin(num);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("a")), num.toString());                   
                }
                if (stringWithoutOpe.indexOf("arccos") != -1) {
                    num = stringWithoutOpe.substring(stringWithoutOpe.indexOf("s") + 1);
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = Math.acos(num);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("a")), num.toString());
                }
                if (stringWithoutOpe.indexOf("arctan") != -1) {
                    num = stringWithoutOpe.substring(stringWithoutOpe.indexOf("n") + 1);
                    if (num.charAt(0) === "(") num = Number(num.substring(1,num.length-1));
                    num = Math.atan(num);
                    if ( num < 0 ) num = "(" + num.toString() + ")";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("a")), num.toString());
                }
                if (stringWithoutOpe.indexOf("ln") != -1) {
                    num = Number(stringWithoutOpe.substring(stringWithoutOpe.indexOf("n") + 1));
                    if( !isNaN(num)) num = Math.log(num);
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("l")), num.toString());
                }
                if (stringWithoutOpe.indexOf("lg") != -1) {
                    num = Number(stringWithoutOpe.substring(stringWithoutOpe.indexOf("g") + 1));
                    if( !isNaN(num)) num = Math.log(num) / Math.log(10);
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("l")), num.toString());
                }
                if (stringWithoutOpe.indexOf("log") != -1) {   
                    num1 = Number(stringWithoutOpe.substring(stringWithoutOpe.indexOf("g")+1, stringWithoutOpe.indexOf(",")));
                    num2 = Number(stringWithoutOpe.substring(stringWithoutOpe.indexOf(",") + 1));
                    if( !isNaN(num1) && !isNaN(num2)) num = Math.log(num2) / Math.log(num1);
                    else num = "NaN";
                    stringWithoutOpe = stringWithoutOpe.replace(stringWithoutOpe.substring(stringWithoutOpe.indexOf("l")), num.toString());
                }
                if (item == "#") {
                    stringRes += stringWithoutOpe;
                } else {
                    stringRes += stringWithoutOpe + item;
                }
            }
        }
        stringRes = eval(stringRes)
        return stringRes.toString();
    }

    //check string length
    function checkLength(string) {
        if (string.length > 32) {
            displayBox.innerHTML = "Infinity";
            $("button").attr("disabled", true);
            $(".calu-func").attr("disabled", false);
        }
    }
});

