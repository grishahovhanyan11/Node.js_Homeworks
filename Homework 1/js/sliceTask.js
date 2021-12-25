//Write slice function that work like Array.slice function.
//for and forEach
function forSliceTask() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8];

  function slice(arr, start = 0, end = arr.length) {
    let resultArrAfterSlice = [];

    for (let i = start; i < end; i++) {
      resultArrAfterSlice.push(arr[i]);
    }

    //with forEach()
    // arr.forEach((item, index) => {
    //   if(index >= start && index < end) {
    //     resultArrAfterSlice.push(item);
    //   }
    // });

    return resultArrAfterSlice;
  }

  let slicedArr = slice(array, 2, 4);

  alert(`Array: ${array}` + '\n' + `Sliced array: ${slicedArr}`);
}

//in Prototype
function ourSliceInPrototype() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8];

  function slice(start = 0, end = this.length) {
    let resultArrAfterSlice = [];

    for (let i = start; i < end; i++) {
      resultArrAfterSlice.push(this[i]);
    }

    return resultArrAfterSlice;
  }

  Array.prototype.ourSlice = slice;
  let slicedArr = array.slice(2, 4);

  alert(`Array: ${array}` + '\n' + `Sliced array: ${slicedArr}`);
}
  