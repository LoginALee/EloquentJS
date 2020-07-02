import asyncCode from "11_async.js";

async function locateScalpel(nest) {
    let current = nest.name;
    for (;;) {
        let next = await anyStorage(nest, current, "scalpel");
        if (next == current) return current;
        current = next;
    }
  }
  
  function locateScalpel2(nest) {
    function loop(current) {
        return anyStorage(nest, current, "scalpel").then(next => {
          if (next == current) return current;
          else return loop(next);
        });
      }
      return loop(nest.name);
  }
  
  locateScalpel(bigOak).then(console.log);
  


  function Promise_all(promises) {
    return new Promise((resolve, reject) => {
      
    });
  }
  
  // Test code.
  Promise_all([]).then(array => {
    console.log("This should be []:", array);
  });
  function soon(val) {
    return new Promise(resolve => {
      setTimeout(() => resolve(val), Math.random() * 500);
    });
  }
  Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array);
  });
  Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(array => {
      console.log("We should not get here");
    })
    .catch(error => {
      if (error != "X") {
        console.log("Unexpected failure:", error);
      }
    });