//[char] at short of [character]

function removeCharacter(charactersArr, char) {//remove [char] from [charactersArr]  
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
  console.log("--------------------")
  let teamThatWin;

  if (teamThatLost === heroes) {
    teamThatWin = villains;
    console.log("Villains win.")
  } else {
    teamThatWin = heroes;
    console.log("Heroes win.")
  }

  for (let winner of teamThatWin) {
    console.log(`${winner.name}[${winner.health}]`);
  }
}

let charactersWhichWereDied = [];//Save the characters which were died
let isAttackEnded = false;

function addSetTimeount(char, charArrWhichWillBeAttacked) {
  if (charArrWhichWillBeAttacked.length === 0) {//One of the teams was win
    findTeamThatWon(charArrWhichWillBeAttacked);
    isAttackEnded = true;
    return;
  }

  let attackTimeSec = (1 / char.speedLevel) * 5;
  
  setTimeout(() => {
    if (charactersWhichWereDied.includes(char) || isAttackEnded) {
      //if (isAttackEnded === true) ==> one of the teams was win and do not need to continue attack 
      //if (charactersWhichWereDied.includes(char) === true) ==> that [char] has been died and can't attack
      return;
    }

    let randomIndex = randomInteger(0, charArrWhichWillBeAttacked.length - 1);
    let char2 = charArrWhichWillBeAttacked[randomIndex];

    char1AttackChar2(char, char2);

    if (char2.health <= 0) {
      console.log(`${char2.name} died`);
      charactersWhichWereDied.push(char2);
      removeCharacter(charArrWhichWillBeAttacked, char2);
    }

    addSetTimeount(char, charArrWhichWillBeAttacked);
  }, attackTimeSec * 1000);


  return;
}

function startAttack(heroes, villains) {//first attacks and adding setTimeouts
  for (let i = 0; i < villains.length + heroes.length; i++) {
    if (i < villains.length) {//in this case [from 0 to 10) will attack villains
      let randomIndex = randomInteger(0, heroes.length - 1);
      char1AttackChar2(villains[i], heroes[randomIndex]);

      if (heroes[randomIndex].health <= 0) {
        removeCharacter(heroes, heroes[randomIndex]);
      }

      addSetTimeount(villains[i], heroes);
    } else {//and [from 10 to 20) heroes
      let index = i - villains.length;
      let randomIndex = randomInteger(0, villains.length - 1);
      char1AttackChar2(heroes[index], villains[randomIndex]);

      if (villains[randomIndex].health <= 0) {
        removeCharacter(villains, villains[randomIndex]);
      }

      addSetTimeount(heroes[index], villains);
    }
  }
}
