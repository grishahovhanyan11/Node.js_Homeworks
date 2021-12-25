let taskMapButton = document.getElementById("taskMap");
let taskSliceButton = document.getElementById("taskSlice");
let taskFlatButton = document.getElementById("taskFlat");


taskMapButton.addEventListener('click', forMapTask);//or ourMapInPrototype
taskSliceButton.addEventListener('click', forSliceTask);//... ourSliceInPrototype
taskFlatButton.addEventListener('click', forFlatTask);// ... ourFlatInPrototype
