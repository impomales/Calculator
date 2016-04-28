$(document).ready(function() {
  var calc = {
    prev: "",
    entry: "0",
    operator: "add",
    operand: 0.0,
    total: 0.0,
    hasPoint: 0,
    err: false,
    operate: function() {
      if (this.operator == "add") this.total += this.operand;
      if (this.operator == "subtract") this.total -= this.operand;
      if (this.operator == "multiply") this.total *= this.operand;
      if (this.operator == "divide") this.total /= this.operand;
    }
  };
  
  $(".button").mouseenter(function() {
    $(this).css("border-color", "#abbbff");
  });
  
  $(".button").mouseleave(function() {
    $(this).css("border-color", "#ddd");
  });
  
  $(".button").click(function() {
    // allclear.
    if ($(this).attr("id") == "allclear") {
      $("#screen").html("<h3>0</h3>");
      calc.total = 0.0;
      calc.prev = "";
      calc.entry = "0";
      calc.operand = 0.0;
      calc.operand = "add";
      calc.err = false;
      calc.hasPoint = 0;
      return;
    }
    
    if (calc.err) return;
    
    if ($(this).attr("id") == "clear") {
      $("#screen").html("<h3>0</h3>");
      calc.prev = "";
      calc.entry = "0";
      calc.hasPoint = 0;
      return;
    }
    // stores number entry.
    if ($(this).attr("class").split(" ")[2] == "number") {
      calc.prev = calc.entry;
      calc.entry = $(this).find("h2").html();
      if (calc.entry == ".") calc.hasPoint++;
      if (calc.hasPoint > 1) {
        $("#screen").html("Err");
        calc.err = true;
        return;
      }
      if (!isNaN(calc.prev) && 
          (calc.prev != "0" || calc.hasPoint == 1)) {
        calc.entry = calc.prev.concat(calc.entry);
      }
      $("#screen").html(calc.entry);
      return;
    } else {
      calc.operand = parseFloat(calc.entry);
    }
    
    // operators
    if ($(this).attr("class").split(" ")[2] == "operator") {
      calc.operate();
      calc.operator = $(this).attr("id");
      calc.prev = "";
      calc.entry = "0";
      calc.hasPoint = 0;
      $("#screen").html(calc.total.toString().substring(0, 10));
    }
    
    if ($(this).attr("class").split(" ")[2] == "result") {     
      if ($(this).attr("id") == "percent") {
        if (calc.operator == "add") 
          calc.operand = 1 + calc.operand/100;
        else if (calc.operator == "subtract")
          calc.operand = 1 - calc.operand/100;
        else {
          $("#screen").html("Err");
          calc.err = true;
          return;
        }
        calc.operator = "multiply";
      }
      calc.operate();
      $("#screen").html(calc.total.toString().substring(0, 10));
      calc.prev = "";
      calc.entry = 0;
      calc.hasPoint = 0;
      calc.operand = 0;
      calc.operator = "add";
    }
    
   
  });
});