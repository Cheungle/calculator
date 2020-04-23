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
        $("button").prop("disabled", false);
    });

    $("#back").click(function () {
        var string = displayBox.innerHTML;
        var num = string.length;
        if (string.charAt(num - 1) == "=" || string.charAt(num - 2) == "=" || string == "0") {
            ;
        } else {
            if (string.substring(num - 2) == "ln" || string.substring(num - 2) == "lg") {
                string = string.substr(0, num - 2);
            }
            if (string.substring(num - 3) == "log" || string.substring(num - 3) == "sin" ||
                string.substring(num - 3) == "cos" || string.substring(num - 3) == "tan") {
                string = string.substr(0, num - 3);
            }
            if (string.substring(num - 6) == "arcsin" || string.substring(num - 6) == "arccos" ||
                string.substring(num - 6) == "arctan") {
                string = string.substr(0, num - 6);
            } else {
                string = string.substr(0, num - 1);
                if (num == 1) {
                    string = "0";
                }
            }
        }
        displayBox.innerHTML = string;
    });

    $("#percent").click(function () {
        clickMarks("%");
    });

    $("#leftbra").click(function () {
        clickMarks("(");
    });
    $("#rightbra").click(function () {
        clickMarks(")");
    });

    $("#statistics").click(function () {
        var num = displayBox.innerHTML;
        stanum += 1;
        staarray.push(Number(num));
        displayBox.innerHTML = "n=" + stanum.toString();
    });

    $("#plus_minus").click(function () {
        var outcome = evaluate();
        var string = (outcome * (-1)).toString();
        checkLength(string);
        displayBox.innerHTML = string;
    });

    $("#decimal").click(function () {
        var string = displayBox.innerHTML;
        if (string.charAt(string.length - 1) == "." || string.charAt(string.length - 1) == ")") {
            ;
        } else {
            string = string + ".";
            checkLength(string);
            displayBox.innerHTML = string;
        }
    });

    //input numbers and marks
    function clickNumbers(val) {
        var string = displayBox.innerHTML;
        if (string.charAt(string.length - 1) == "%" || (string.charAt(string.length - 1) == ")" && string.charAt(string.length - 2) != "y") ||
            string.charAt(string.length - 1) == "=" || string.charAt(string.length - 1) == "e" ||
            string.charAt(string.length - 1) == "i" || string.charAt(string.length - 1) == "!") {
            ;
        } else {
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

    function clickMarks(val) {
        var string = displayBox.innerHTML;
        var num = string.length;
        if (string.substring(0, 2) == "n=") {
            if (val.substring(0, 5) == "mean=" || val.substring(0, 9) == "variance=") {
                string = val;
                checkLength(string);
                displayBox.innerHTML = string;
            }
        }
        if (!isNaN(Number(string.charAt(num - 1))) || string.charAt(num - 1) == ")" ||
            string.charAt(num - 1) == "%" || string.charAt(num - 1) == "!" ||
            string.charAt(num - 1) == "e" || string.charAt(num - 1) == "i") {
            if (val.substring(0, 5) == "mean=" || val.substring(0, 9) == "variance=" || val == "ln" || val == "(" || val == "e^" ||
                val == "lg" || val == "sin" || val == "cos" || val == "tan" || val.substring(0, 3) == "arc" || val == "log" || val == "1/x") {
                ;
            } else {
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
        if (string.charAt(num - 1) == "+" || string.charAt(num - 1) == "-" || string.charAt(num - 1) == "*" ||
            string.charAt(num - 1) == "/" || string.charAt(num - 1) == "(" || string == "0") {
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
    }

    //numbers and letters
    $("#zero").click(function () {
        clickNumbers("0");
    });
    $("#one").click(function () {
        clickNumbers("1");
    });
    $("#two").click(function () {
        clickNumbers("2");
    });
    $("#three").click(function () {
        clickNumbers("3");
    });
    $("#four").click(function () {
        clickNumbers("4");
    });
    $("#five").click(function () {
        clickNumbers("5");
    });
    $("#six").click(function () {
        clickNumbers("6");
    });
    $("#seven").click(function () {
        clickNumbers("7");
    });
    $("#eight").click(function () {
        clickNumbers("8");
    });
    $("#nine").click(function () {
        clickNumbers("9");
    });

    $("#e").click(function () {
        clickNumbers("e");
    });
    $("#pi").click(function () {
        clickNumbers("pi");
    });
    //按数字，按m+，最后按操作直接输出结果
    $("#mean").click(function () {
        var outcome = 0;
        for (var i = 0; i < stanum; i++) {
            outcome += staarray.pop() / stanum;
        }
        clickMarks("mean=" + outcome.toString());
        $("button").prop("disabled", true);
        $(".calu-func").attr("disabled", false);
    });
    $("#variance").click(function () {
        var mean = 0;
        var outcome = 0;
        var staarray1 = staarray.concat();
        for (var i = 0; i < stanum; i++) {
            mean += staarray.pop() / stanum;
        }
        for (var j = 0; j < stanum; j++) {
            var cnum = staarray1.pop() - mean;
            outcome += cnum * cnum / stanum;
        }
        clickMarks("variance=" + outcome.toFixed(6));
        $("button").prop("disabled", true);
        $(".calu-func").attr("disabled", false);
    });
    //快捷键--先按数字再按操作
    $("#factorial").click(function () {
        clickMarks("!");
    });
    $("#square").click(function () {
        clickMarks("^2");
    });
    $("#cube").click(function () {
        clickMarks("^3");
    });
    $("#radicaltwo").click(function () {
        clickMarks("^(1/2)");
    });
    $("#radicalthree").click(function () {
        clickMarks("^(1/3)");
    });
    //快捷键--先按操作再按数字
    $("#fraction").click(function () {
        clickMarks("1/x");
    });
    $("#ln").click(function () {
        clickMarks("ln");
    });
    $("#lg").click(function () {
        clickMarks("lg");
    });
    $("#epower").click(function () {
        clickMarks("e^");
    });
    $("#log").click(function () {
        clickMarks("log");
    });
    //按第一个数字，按操作，按第二个数字
    $("#powerex").click(function () {
        clickMarks("^");
    });
    $("#radical").click(function () {
        clickMarks("^(1/y)");
    });
    //三角函数与反三角函数
    $("#sin").click(function () {
        clickMarks("sin");
    });
    $("#cos").click(function () {
        clickMarks("cos");
    });
    $("#tan").click(function () {
        clickMarks("tan");
    });
    $("#arcsin").click(function () {
        clickMarks("arcsin");
    });
    $("#arccos").click(function () {
        clickMarks("arccos");
    });
    $("#arctan").click(function () {
        clickMarks("arctan");
    });
    //弧度化角度、角度化弧度（带有pi的识别为弧度）
    $("#rad").click(function () {
        var string = displayBox.innerHTML;
        if (string.indexOf("p") == -1) {
            string = (Number(string) / 180).toString() + "pi";
            checkLength(string);
            displayBox.innerHTML = string;
        } else {
            string = (Number(string.substring(0, string.indexOf("p"))) * 180).toString();
            checkLength(string);
            displayBox.innerHTML = string;
        }
        $("button").prop("disabled", true);
        $(".calu-func").attr("disabled", false);
    });
    //提供一个0~1之间的随机数
    $("#rand").click(function () {
        var num = Math.random();
        clickMarks(num.toFixed(6));
    });

    //operation
    $("#add").click(function () {
        clickMarks("+");
    });
    $("#subtract").click(function () {
        clickMarks("-");
    });
    $("#multiply").click(function () {
        clickMarks("*");
    });
    $("#divide").click(function () {
        clickMarks("/");
    });
    $('#equals').click(function () {
        var string = evaluate().toString();
        checkLength(string);
        displayBox.innerHTML = string;
        $("button").prop("disabled", false);
        $(".calu-func").attr("disabled", false);
    });

    //evaluate
    function evaluate() {
        var string = displayBox.innerHTML;
        var num = string.length;
        var evarray = [];
        var nl = 0;
        var nr = 0;
        for (var i = 0; i < num; i++) {
            var item = string.charAt(i);
            if (item == "(") {
                evarray.push(item);
                nl += 1;
            }
            if (item == ")") {
                if (evarray.length > 0) evarray.pop();
                nr += 1;
            }
        }
        if (evarray.length != 0 || nr > nl) {
            displayBox.innerHTML = "Invalid";
            $("button").prop("disabled", true);
            $(".calu-func").attr("disabled", false);
        }

        while (string.lastIndexOf("(") != -1) {
            var numl = string.lastIndexOf("(");
            var numr = string.indexOf(")", numl);
            var stringx = string.substring(numl, numr + 1);
            var stringy = string.substring(numl + 1, numr);
            string = string.replace(stringx, evalbra(stringy));
        }
        string = evalbra(string);
        var outcome = eval(string);
        return outcome;
    }

    function evalbra(val) {
        var string = val + "#";
        var string1 = "";
        var lastmark = -1;
        for (var i = 0; i < string.length; i++) {
            item = string.charAt(i);
            if (item == "+" || item == "-" || item == "*" || item == "/" || item == "#") {
                var string2 = string.substring(lastmark + 1, i);
                var lastmark = i;
                if (string2.indexOf("e") != -1) {
                    string2 = string2.replace("e", Math.E.toFixed(6));
                }
                if (string2.indexOf("p") != -1) {
                    string2 = string2.replace("pi", Math.PI.toFixed(7));
                }
                if (string2.indexOf("%") != -1) {

                    num = Number(string2.substring(0, string2.indexOf("%")));
                    num = 0.01 * num;
                    string2 = string2.replace(string2.substring(0, string2.indexOf("%") + 1), num.toString());

                }
                if (string2.indexOf("!") != -1) {

                    num = Number(string2.substring(0, string2.indexOf("!")));
                    num1 = 1;
                    for (var k = 1; k <= num; k++) {
                        num1 = num1 * k;
                    }
                    string2 = string2.replace(string2.substring(0, string2.indexOf("!") + 1), num1.toString());

                }
                if (string2.indexOf("^") != -1) {

                    num1 = Number(string2.substring(0, string2.indexOf("^")));
                    num2 = Number(string2.substring(string2.indexOf("^") + 1));
                    num = Math.pow(num1, num2);
                    string2 = string2.replace(string2, num.toString());

                }
                if (string2.indexOf("sin") != -1 && string2.indexOf("arc") == -1) {

                    num = Number(string2.substring(string2.indexOf("n") + 1));
                    num = Math.sin(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("s")), num.toString());

                }
                if (string2.indexOf("cos") != -1 && string2.indexOf("arc") == -1) {

                    num = Number(string2.substring(string2.indexOf("s") + 1));
                    num = Math.cos(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("c")), num.toString());

                }
                if (string2.indexOf("tan") != -1 && string2.indexOf("arc") == -1) {

                    num = Number(string2.substring(string2.indexOf("n") + 1));
                    num = Math.tan(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("t")), num.toString());

                }
                if (string2.indexOf("arcsin") != -1) {
                   
                    num = Number(string2.substring(string2.indexOf("n") + 1));
                    num = Math.asin(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("a")), num.toString());
                    
                }
                if (string2.indexOf("arccos") != -1) {
                   
                    num = Number(string2.substring(string2.indexOf("s") + 1));
                    num = Math.acos(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("a")), num.toString());
                   
                }
                if (string2.indexOf("arctan") != -1) {
                    
                    num = Number(string2.substring(string2.indexOf("n") + 1));
                    num = Math.atan(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("a")), num.toString());
                   
                }
                if (string2.indexOf("ln") != -1) {

                    num = Number(string2.substring(string2.indexOf("n") + 1));
                    num = Math.log(num);
                    string2 = string2.replace(string2.substring(string2.indexOf("l")), num.toString());

                }
                if (string2.indexOf("lg") != -1) {
                    
                    num = Number(string2.substring(string2.indexOf("g") + 1));
                    num = Math.log(num) / Math.log(10);
                    string2 = string2.replace(string2.substring(string2.indexOf("l")), num.toString());
                    
                }
                if (string2.indexOf("log") != -1) {
                   
                    num1 = Number(string2.substring(string2.indexOf("g")+1, string2.indexOf(",")));
                    num2 = Number(string2.substring(string2.indexOf(",") + 1));
                    num = Math.log(num2) / Math.log(num1);
                    string2 = string2.replace(string2.substring(string2.indexOf("l")), num.toString());
                    
                }
                if (item == "#") {
                    string1 += string2;
                } else {
                    string1 += string2 + item;
                }
            }
        }
        string1 = eval(string1)
        return string1.toString();
    }

    //check string length
    function checkLength(string) {
        if (string.length > 32) {
            displayBox.innerHTML = "Infinity";
            $("button").prop("disabled", true);
            $(".calu-func").attr("disabled", false);
        }
    }
});

