function reverseButtonClicked() {
  function reverseObj(obj) {
    let revObj = {};

    for (let key in obj) {
      if (Array.isArray(obj[key])) {//if ARRAY -> create string
        let arrInStr = obj[key].join();
        revObj[arrInStr] = key;
      } else if (typeof obj[key] === "object") {
        revObj[key] = reverseObj(obj[key]);
      } else {
        revObj[obj[key]] = key;
      }
    }

    return revObj;
  }

  const reverseObject = reverseObj(obj);

  alert(JSON.stringify(reverseObject, undefined, 2));
}

const obj = {
  name: "Jhon",
  country: {
    name: "Armenia",
    code: 374,
    address: {
      city: "Erevan",
      street: "Abovyan",
      home: "1"
    }
  },
  friends: ["Leo", "Daneil"]
};