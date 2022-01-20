class Character {
  speedLevel = +randomDecimal(1, 5);
  health = 100;
  power = +randomDecimal(1, 10);
  
  constructor(name) {
    this.name = name;
  }
}

function randomInteger(max, min) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomDecimal(max, min) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function fillArray(namesArr) {
  let resultCharacters = [];
  let loopIterationCount = namesArr.length;

  for (let i = 0; i < loopIterationCount; i++) {
    let randomIndexForName = randomInteger(0, namesArr.length - 1);
    let currentCharacter = new Character(namesArr[randomIndexForName]);

    resultCharacters.push(currentCharacter);

    let temp = namesArr[namesArr.length - 1];
    namesArr[namesArr.length - 1] = namesArr[randomIndexForName];
    namesArr[randomIndexForName] = temp;

    namesArr.length--;
  }

  return resultCharacters;
}

const heroNames = ["Wolverine", "Spider-Man", "Thor", "Iron-Man", "Hulk",
  "Captain-America", "Deadpool", "Doctor-Strange", "Black-Panther", "Black-Widow"];

const villainNames = ["Green-Goblin", "Hela", "Mysterio", "Xu-Wenwu", "Doctor-Octopus",
  "Magneto", "Loki", "Killmonger", "Thanos", "Vulture"];

let heroes = fillArray(heroNames);
let villains = fillArray(villainNames);
