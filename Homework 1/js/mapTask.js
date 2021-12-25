//Write map function that work like Array.map function.
//for and forEach
function forMapTask() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8];

  function map(arr, cbFunc) {
    let resultArrAfterMap = [];

    for (let i = 0; i < arr.length; i++) {
      resultArrAfterMap[i] = cbFunc(arr[i], i, arr);
    }

    //with forEach()
    //arr.forEach((element, index, array) => {
    // resultArrAfterMap.push(cbFunc(element, index, array));
    //});

    return resultArrAfterMap;
  }

  alert(`Array: ${array}` + '\n' + `Maped array: ${map(array, (item, index, array) => item * 5)}`);
}

//in Prototype 
function ourMapInPrototype() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8];

  function map(cbFunc) {
    let resultArrAfterMap = [];

    for (let i = 0; i < this.length; i++) {
      resultArrAfterMap[i] = cbFunc(this[i], i, this);
    }

    return resultArrAfterMap;
  }

  Array.prototype.ourMap = map;
  let mapedArray = array.ourMap(item => item * 7);

  alert(`Array: ${array}` + '\n' + `Maped array: ${mapedArray}`);
}
