const arrayToList = (array) => {
  let arrayLength = array.length;
  let list = {};

  for (let i = arrayLength; i > 0; i--) {
    if (i == arrayLength) {
      list = {
        value: array[i - 1],
        rest: null,
      };
    } else {
      list = {
        ...list,
        value: array[i - 1],
        rest: list,
      };
    }
  }
  return list;
};

const listToArray = (list, array = []) => {
  for (let key of Object.keys(list)) {
    if (list[key] === null) {
      return array;
    } else if (key === "value") {
      array.push(list[key]);
    } else if (typeof list[key] === "object") {
      return listToArray(list[key], array);
    }
  }
};

const prepend = (element, list) => {
  let newList = {};

  newList = {
    value: element,
    rest: list,
  };
  return newList;
};

const nth = (list, number, counter = 0) => {
  for (let key of Object.keys(list)) {
    if (number === 0 && key === "value") {
      return list[key];
    } else if (key === "value" && number === counter) {
      return list[key];
    } else if (typeof list[key] === "object") {
      counter++;
      return nth(list[key], number, counter);
    }
  }
};

const deepEqual = (firstVal, secondVal) => {
  if (firstVal === secondVal) {
    return true;
  } else if (typeof firstVal === "object" && typeof secondVal === "object") {
    for (let key of Object.keys(firstVal)) {
      if (
        typeof firstVal[key] === "object" &&
        typeof secondVal[key] === "object"
      ) {
        return deepEqual(firstVal[key], secondVal[key]);
      } else if (firstVal[key] === secondVal[key]) {
        console.log(firstVal[key],firstVal[key])
        return deepEqual(firstVal[key], secondVal[key]);
      }
      else if(typeof firstVal[key] ===  typeof secondVal[key]){
    	  return deepEqual(firstVal[key], secondVal[key]);
      }
      return false;
    }
  } 
  
  return false;
  
};

//console.log(arrayToList([10, 20]));
// →
console.log(
  listToArray({
    value: 10,
    rest: { value: 20, rest: { value: 30, rest: null } },
  })
);

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
