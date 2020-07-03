topScope.array = (...elements) => {
    let array = [];
     for(let element of elements){
      array.push(element) 
     }
     return array;
   };
   
   topScope.length = (array) =>{
    return array.length; 
   };
   
   topScope.element = (array, n) =>{
    return array[n];
   };
   
   run(`
   do(define(sum, fun(array,
        do(define(i, 0),
           define(sum, 0),
           while(<(i, length(array)),
             do(define(sum, +(sum, element(array, i))),
                define(i, +(i, 1)))),
           sum))),
      print(sum(array(1, 2, 3))))
   `);
   // → 6

   function skipSpace(string) {
    let skippable = string.match(/^(\s|#.*)*/);
    return string.slice(skippable[0].length);
  }
  
  console.log(parse("# hello\nx"));
  // → {type: "word", name: "x"}
  
  console.log(parse("a # one\n   # two\n()"));
  // → {type: "apply",
  //    operator: {type: "word", name: "a"},
  //    args: []}

