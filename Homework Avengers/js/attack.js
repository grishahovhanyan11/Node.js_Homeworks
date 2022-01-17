//[char] at short of [character]
function removeChar(charactersArr, char) {
  //remove [char] from [charactersArr]
  let charIndex = charactersArr.indexOf(char);
  let temp = charactersArr[charactersArr.length - 1];
  charactersArr[charactersArr.length - 1] = charactersArr[charIndex];
  charactersArr[charIndex] = temp;

  charactersArr.length--;
}

function char1AttackChar2(character1, character2) {
  console.log(
    `${character1.name}[${character1.health}] hits ${character2.name}[${character2.health}] with power of ${character1.power}`
  );

  character2.health = +(character2.health - character1.power).toFixed(2);
}

function findTeamThatWon(teamThatLost) {
  let teamThatWin;
  console.log("--------------------")
  if(teamThatLost === heroes) {
    teamThatWin = villains;
    console.log("Villains win.")
  } else {
    teamThatWin = heroes;
    console.log("Heroes win.")
  }

  for(let winner of teamThatWin) {
    clearInterval(winner.intervalId);
    console.log(`${winner.name}[${winner.health}]`);
  }
}

function addSetInterval(char, charArrWhichWillBeAttacked) {
  let attackInterval = (1 / char.speedLevel) * 5;

  let id = setInterval(() => {
    let randomIndex = randomInteger(0, charArrWhichWillBeAttacked.length - 1);
    let char2 = charArrWhichWillBeAttacked[randomIndex];
    char1AttackChar2(char, char2);

    if (char2.health <= 0) {
      console.log(`${char2.name} died`);
      if(typeof char2.intervalId === "number") {
        clearInterval(char2.intervalId);
      }
      removeChar(charArrWhichWillBeAttacked, char2);      
    }

    if(charArrWhichWillBeAttacked.length === 0) {
      findTeamThatWon(charArrWhichWillBeAttacked)
    }
  }, attackInterval * 1000);

  char.intervalId = id;
}

function startAttack(heroes, villains) {
  for (let i = 0; i < villains.length; i++) {
    let randomIndex = randomInteger(0, heroes.length - 1);
    char1AttackChar2(villains[i], heroes[randomIndex]);

    if(heroes[randomIndex].health <= 0) {
      removeChar(heroes, heroes[randomIndex]);
    }

    addSetInterval(villains[i], heroes);
  }

  for (let i = 0; i < heroes.length; i++) {
    let randomIndex = randomInteger(0, villains.length - 1);
    char1AttackChar2(heroes[i], villains[randomIndex]);

    if(villains[randomIndex].health <= 0) {
      removeChar(villains, villains[randomIndex]);
    }

    addSetInterval(heroes[i], villains);
  }
}

startAttack(heroes, villains);
