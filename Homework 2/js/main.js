let alertButton = document.getElementById("alertObjButton");
let objReverseButton = document.getElementById("taskObjReverse");

alertButton.addEventListener('click', () => alert(JSON.stringify(obj, undefined, 2)));
objReverseButton.addEventListener('click', () => { reverseButtonClicked(obj) });