//Write a program to flatten an array.
//for
function forFlatTask() {
  const array = [1, 2, [30, 45, [54, 6, [7, { a: 1 }, ['15', '10$']]]]];

  function flat(arr, depth = 1) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        newArr.push(...flat(arr[i], depth - 1));
        //or 
        //newArr = newArr.concat(flat(arr[i], depth - 1));
      } else {
        newArr.push(arr[i]);
      }
    }

    return newArr;
  }

  let flatDepth = 3;
  let result = flat(array, flatDepth);
  console.log(array)
  console.log(result)

}

//in Prototype
function ourFlatInPrototype() {
  const array = [1, 2, [30, 45, [54, 6, [7, { a: 1 }, ['15', '10$']]]]];

  function flat(depth = 1) {
    let newArr = [];

    for (let i = 0; i < this.length; i++) {
      if (Array.isArray(this[i]) && depth > 0) {
        newArr.push(...flat(this[i], depth - 1));
        //or 
        //newArr = newArr.concat(flat(this[i], depth - 1));
      } else {
        newArr.push(this[i]);
      }
    }

    return newArr;
  }

  Array.prototype.ourFlat = flat;

  let flatDepth = 3;
  let result = array.flat(flatDepth);
  console.log(array)
  console.log(result)
}

