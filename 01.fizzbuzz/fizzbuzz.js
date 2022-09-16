number = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
number.forEach(function(index){
  if (index % 3 == 0 && index % 5 == 0) {
    console.log("FizzBuzz");
  }else if(index % 3 == 0) {
    console.log("Fizz");
  }else if(index % 5 == 0) {
    console.log("Buzz");
  }else {
    console.log(index)
  }
});
