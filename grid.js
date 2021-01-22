const grid = document.querySelector('.grid')
const start = document.querySelector('.start')
const restart = document.querySelector('.restart')
const scoreTotal = document.querySelector('.score')
const livesTotal = document.querySelector('.lifeRemaining')
const timeTotal = document.querySelector('.timeRemaining')
const audioPlayer = document.querySelector('audio')
const width = 16
const height = 13
const cells = []
let characterPosition = 199
//? creating an array of right to left villains: 
let rightVilStart = [126, 121, 116, 156, 151, 146, 190, 185, 180] 
//? creating an array of villains coming in from left to right
let leftVilStart = [129, 132, 135, 138, 141, 161, 164, 167, 170, 173]
//? these two variables below are the out of bound cells where the avatar cannot go (with no background)
let rightMystStartFront = [45, 41, 37, 33, 77, 73, 69, 65]
let rightMystStartBack = [46, 42, 38, 34, 78, 74, 70, 66]
let leftMystStartFront = [20, 24, 28, 52, 56, 60, 84, 88, 92]
let leftMystStartBack = [19, 23, 27, 51, 55, 59, 83, 87, 91]
let leftMystFlower = [16, 31, 48, 63, 80, 95]
const outOfBoundsLeft = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192]
const outOfBoundsRight = [15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207]
let lives = 3
let score = 0
let time = 30
let mystRightID
let mystLeftID
let villainRightID
let villainLeftID
let intervalID
let loseLifeInterval
let gameStart = false
scoreTotal.innerHTML = score
livesTotal.innerHTML = lives
timeTotal.innerHTML = time

//? for adding more characters later 
let scoobyChar = 'scooby'
let shaggyChar = 'shaggy'
let velmaChar = 'velma'
let fredChar = 'fred'
let daphneChar = 'daphne'
let character = scoobyChar
let changeChar = function changeChar() {
  if (character === scoobyChar && cells[characterPosition].classList.contains('safeZone') && score < 200) {
    character = shaggyChar
    console.log('zoinks shaggy')
} else if (character = shaggyChar && cells[characterPosition].classList.contains('safeZone') && score < 300) {
  character = velmaChar
  console.log('jinkees velma')
} else if (character = velmaChar && cells[characterPosition].classList.contains('safeZone') && score < 400) {
  character = fredChar
  console.log('fred')
} else if (character = fredChar && cells[characterPosition].classList.contains('safeZone') && score < 500) {
  character = daphneChar
  console.log('daphne')
}
}

//? create the grid
for (let index = 0; index < width * height; index++) {
  //* generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell) 
  cells.push(cell)
  //* number each cell by its index.
  // cell.innerHTML = index
  //* set the width and height of cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / height}%`
}
//? common code block - adds Scooby avatar
cells[characterPosition].classList.remove(character)
characterPosition += 1
cells[characterPosition].classList.add(character)

//? to change the colour of the different grid sections
for (let i = 0; i <= cells.length; i++) {
  if (i >= 0 && i <= 15) {
    cells[i].classList.add('safeZone')
  } else if (i >= 16 && i <= 95) {
    cells[i].style.backgroundColor = '#f5f5f5'
    cells[i].style.borderTop = '1px solid #d3d3d3'
    cells[i].style.borderBottom = '1px solid #d3d3d3'
  } else if (i >= 96 && i <= 111) {
    cells[i].style.backgroundColor = '#84e09d'
  } else if (i >= 112 && i <= 191) {
    cells[i].style.backgroundColor = '#b19cd9'
    cells[i].style.borderTop = '1px solid yellow'
    cells[i].style.borderBottom = '1px solid yellow'
  } else if (i >= 192 && i <= 207) {
    cells[i].style.backgroundColor = '#84e09d'
  }
  //* adding the characters and obstacles 
  if (rightVilStart.includes(i)) {
    cells[i].classList.add('villainsFromRight') 
  }
  if (leftVilStart.includes(i)) {
    cells[i].classList.add('villainsFromLeft')
  }
  if (rightMystStartFront.includes(i)) {
    cells[i].classList.add('mystFromRightFront')
  }
  if (rightMystStartBack.includes(i)) {
    cells[i].classList.add('mystFromRightBack')
  }
  if (leftMystStartFront.includes(i)) {
    cells[i].classList.add('mystFromLeftFront')
  }
  if (leftMystStartBack.includes(i)) {
    cells[i].classList.add('mystFromLeftBack')
  }
  if (leftMystFlower.includes(i)) {
    cells[i].classList.add('leftFlower')
  }
  //* to make the out of bound zones invisible
  if (outOfBoundsLeft.includes(i)) {
    cells[i].style.background = 'none'
    cells[i].style.border = 'none'
  }
  if (outOfBoundsRight.includes(i)) {
    cells[i].style.background = 'none'
    cells[i].style.border = 'none'
  }
}

function moveRightVil() {
  villainRightID = setInterval(() => {
    rightVilStart.forEach((villain, i) => {
      if (villain === 112 || villain === 144 || villain === 176) {
        // console.log('reached end')
        cells[villain].classList.remove('villainsFromRight')
        rightVilStart[i] += 14
        cells[villain += 14].classList.add('villainsFromRight')
      } else {
        cells[villain].classList.remove('villainsFromRight')
        rightVilStart[i] -= 1
        cells[villain -= 1].classList.add('villainsFromRight')
      }
    })
  }, 2000)
}

function moveLeftVil() {
  villainLeftID = setInterval(() => {
    leftVilStart.forEach((villain, i) => {
      if (villain === 143 || villain === 175) {
        cells[villain].classList.remove('villainsFromLeft')
        leftVilStart[i] -= 14
        cells[villain -= 14].classList.add('villainsFromLeft')
      } else {
        cells[villain].classList.remove('villainsFromLeft')
        leftVilStart[i] += 1
        cells[villain += 1].classList.add('villainsFromLeft')
      }
    })
  }, 1500)
}

function moveRightMyst() {
  mystRightID = setInterval(() => {
    rightMystStartFront.forEach((machine, i) => {
      if (machine === 32 || machine === 64) {
        cells[machine].classList.remove('mystFromRightFront')
        rightMystStartFront[i] += 14
        cells[machine += 14].classList.add('mystFromRightFront')
      } else {
        cells[machine].classList.remove('mystFromRightFront')
        rightMystStartFront[i] -= 1
        cells[machine -= 1].classList.add('mystFromRightFront')
      }
    })
    rightMystStartBack.forEach((machine, i) => {
      if (machine === 32 || machine === 64) {
        cells[machine].classList.remove('mystFromRightBack')
        rightMystStartBack[i] += 14
        cells[machine += 14].classList.add('mystFromRightBack')
      } else {
        cells[machine].classList.remove('mystFromRightBack')
        rightMystStartBack[i] -= 1
        cells[machine -= 1].classList.add('mystFromRightBack')
      }
    })
  }, 1000)
}

function moveLeftMyst() {
  mystLeftID = setInterval(() => {
    leftMystStartFront.forEach((machine, i) => {
      if (machine === 31 || machine === 63 || machine === 95) {
        cells[machine].classList.remove('mystFromLeftFront')
        leftMystStartFront[i] -= 14
        cells[machine -= 14].classList.add('mystFromLeftFront')
      } else {
        cells[machine].classList.remove('mystFromLeftFront')
        leftMystStartFront[i] += 1
        cells[machine += 1].classList.add('mystFromLeftFront')
      }
    })
    leftMystStartBack.forEach((machine, i) => {
      if (machine === 31 || machine === 63 || machine === 95) {
        cells[machine].classList.remove('mystFromLeftBack')
        leftMystStartBack[i] -= 14
        cells[machine -= 14].classList.add('mystFromLeftBack')
      } else {
        cells[machine].classList.remove('mystFromLeftBack')
        leftMystStartBack[i] += 1
        cells[machine += 1].classList.add('mystFromLeftBack')
      }
    })
    leftMystFlower.forEach((machine, i) => {
      if (machine === 31 || machine === 63 || machine === 95) {
        cells[machine].classList.remove('leftFlower')
        leftMystFlower[i] -= 14
        cells[machine -= 14].classList.add('leftFlower')
      } else {
        cells[machine].classList.remove('leftFlower')
        leftMystFlower[i] += 1
        cells[machine += 1].classList.add('leftFlower')
      }
    })
  }, 1000)
}

function movePieces() {
  moveRightVil()
  moveLeftVil()
  moveRightMyst()
  moveLeftMyst()
  moveWithVanLeft()
  moveWithLogoRight()
}

function moveCharacter() {
  if (gameStart === false) {
    document.addEventListener('keyup', (event) => {
      const key = event.key
      const leftBound = [1, 97, 113, 129, 145, 161, 177, 193]
      const rightBound = [14, 110, 126, 142, 158, 174, 190, 206]
      if (key === 'ArrowRight' && !(rightBound.includes(characterPosition))) {
        cells[characterPosition].classList.remove(character)
        characterPosition += 1
        cells[characterPosition].classList.add(character)
        audioPlayer.src = './Sounds/CharMove.mp3'
        audioPlayer.play()
      } else if (key === 'ArrowLeft' && !(leftBound.includes(characterPosition))) {
        cells[characterPosition].classList.remove(character)
        characterPosition -= 1
        cells[characterPosition].classList.add(character)
        audioPlayer.src = './Sounds/CharMove.mp3'
        audioPlayer.play()
      } else if (key === 'ArrowDown' && !(characterPosition + width >= width * height)) {
        cells[characterPosition].classList.remove(character)
        characterPosition += width
        cells[characterPosition].classList.add(character)
        audioPlayer.src = './Sounds/Jinkies.mp3'
        audioPlayer.play()
      } else if (key === 'ArrowUp' && !(characterPosition < width)) {
        cells[characterPosition].classList.remove(character)
        characterPosition -= width
        cells[characterPosition].classList.add(character)
        audioPlayer.src = './Sounds/CharMove.mp3'
        audioPlayer.play()
      }
    })
  }
}

function resetChar() {
  cells[characterPosition].classList.remove(character)
  characterPosition = 200
  cells[characterPosition].classList.add(character)
}

function removeChar() { 
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('scooby')) {
      cells[i].classList.remove('scooby')
    } else if (cells[i].classList.contains('shaggy')) {
      cells[i].classList.remove('shaggy')
    } else if (cells[i].classList.contains('velma')) {
      cells[i].classList.remove('velma')
    } else if (cells[i].classList.contains('fred')) {
      cells[i].classList.remove('fred')
    } else if (cells[i].classList.contains('daphne')) {
      (cells[i].classList.remove('daphne'))
    }
  }
  character = scoobyChar
  characterPosition = 200
  cells[characterPosition].classList.add(character)
}
//!---------------------------------------------------------------------------->
// //? move the characters back to their starting array?
//function resetObjects() {
//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i].classList.contains('villainsFromLeft')) {
//       console.log('hello')
//       cells[i].classList.remove('villainsFromLeft')
//       leftVilStart.classList.add('villainsFromLeft') 
//     }


//     // } else if (cells[i].classList.contains('villainsFromRight')) {
//     //   cells[i].classList.remove('villainsFromRight')
//     //   cells[rightVilStart].classList.add('villainsFromRight')
//     // }     
//   }
//   }
//!---------------------------------------------------------------------------->

//? function for the character to lose 
function loseLife() {
  loseLifeInterval = setInterval(() => {
    if ((cells[characterPosition].classList.contains('villainsFromRight') || cells[characterPosition].classList.contains('villainsFromLeft')) && lives > 0) {
      audioPlayer.src = './Sounds/bongo-feet.mp3'
      audioPlayer.play()
      livesTotal.innerHTML = lives -= 1
      resetChar()
      clearInterval(loseLifeInterval)
      time = 30
      timeTotal.innerHTML = `${time}`
    } else if ((characterPosition >= 17 && characterPosition <= 94) && !cells[characterPosition].classList.contains('mystFromLeftFront') && !cells[characterPosition].classList.contains('mystFromLeftBack') && !cells[characterPosition].classList.contains('leftFlower') && !cells[characterPosition].classList.contains('mystFromRightFront') && !cells[characterPosition].classList.contains('mystFromRightBack')) { 
      audioPlayer.src = './Sounds/bongo-feet.mp3'
      audioPlayer.play()
      livesTotal.innerHTML = lives -= 1
      resetChar()
      clearInterval(loseLifeInterval)
      time = 30
      timeTotal.innerHTML = `${time}`
    } else if (outOfBoundsRight.includes(characterPosition) || outOfBoundsLeft.includes(characterPosition)) {
      audioPlayer.src = './Sounds/bongo-feet.mp3'
      audioPlayer.play()
      livesTotal.innerHTML = lives -= 1
      resetChar()
      clearInterval(loseLifeInterval)
      time = 30
      timeTotal.innerHTML = `${time}`
    } else if (lives === 0) {
      audioPlayer.src = './Sounds/Meddling Kids.mov'
      // './Sounds/Sad_Trombone-Joe_Lamb-665429450.mp3'
      audioPlayer.play()
      gameOver()
      alert('Zoinks, you lost! Click \'ok\' to play again!')
    }
  }, 100)
}

function gameOver() {
  clearInterval(mystRightID)
  clearInterval(mystLeftID)
  clearInterval(moveWithVanLeftInterval)
  clearInterval(moveWithLogoRightInterval)
  clearInterval(villainLeftID)
  clearInterval(villainRightID)
  time = 30
  lives = 3
  score = 0
  timeTotal.innerHTML = `${time}`
  livesTotal.innerHTML = `${lives}`
  scoreTotal.innerHTML = `${score}`
  clearInterval(intervalID)
  clearInterval(loseLifeInterval)
  resetChar()
  removeChar()
  // resetObjects()
}

//? the character wins the game 
function win() {
  if (time >= 0 && cells[characterPosition].classList.contains('safeZone')) {
    score += 100
    audioPlayer.src = './Sounds/https___www.tones7.com_media_scooby.mp3'
    audioPlayer.play()
    scoreTotal.innerHTML = `${score}`
    changeChar()
    resetChar()
    time = 30
    timeTotal.innerHTML = `${time}`
  }
  if (score === 500) {
    cells[characterPosition].classList.remove(character)
    audioPlayer.src = './Sounds/Scooby-doo-theme-song.mp3'
    audioPlayer.play()
    alert('You win - treat yourself to a Scooby Snack! Click start to play again!')
  }
}

function moveWithVanLeft() {
  moveWithVanLeftInterval = setInterval(() => {
    if (((characterPosition >= 17 && characterPosition <= 30) || (characterPosition >= 41 && characterPosition <= 62) || (characterPosition >= 81 && characterPosition <= 94)) && cells[characterPosition].classList.contains('mystFromLeftFront')
      || ((characterPosition >= 17 && characterPosition <= 30) || (characterPosition >= 41 && characterPosition <= 62) || (characterPosition >= 81 && characterPosition <= 94)) && cells[characterPosition].classList.contains('mystFromLeftBack')
      || ((characterPosition >= 17 && characterPosition <= 30) || (characterPosition >= 41 && characterPosition <= 62) || (characterPosition >= 81 && characterPosition <= 94)) && cells[characterPosition].classList.contains('leftFlower')) { 
      cells[characterPosition].classList.remove(character)
      characterPosition += 1
      cells[characterPosition].classList.add(character)
    }
  }, 999.5)
}

function moveWithLogoRight() {
  moveWithLogoRightInterval = setInterval(() => {
    if (((characterPosition >= 33 && characterPosition <= 46) || (characterPosition >= 65 && characterPosition <= 78)) && (cells[characterPosition].classList.contains('mystFromRightFront') || cells[characterPosition].classList.contains('mystFromRightBack'))) {
      cells[characterPosition].classList.remove(character)
      characterPosition -= 1
      cells[characterPosition].classList.add(character)
    }
  }, 999.5)
}

start.addEventListener('click', () => {
  audioPlayer.src = './Sounds/where.wav'
  audioPlayer.play()
  moveCharacter()
  movePieces()
  gameStart = true
  //? click start, the timer begins, if timer runs out lose a life and put scooby back at the start  
  intervalID = setInterval(() => {
    if (time > -1) {
      timeTotal.innerHTML = time
      time--
      win()
      loseLife()
    } else if (time === -1) {
      gameOver()
    }
    if (lives > 0 && time === -1) { 
      livesTotal.innerHTML = lives - 1
      resetChar()
      time += 30
      lives -= 1
    } 
  }, 1000)
})

restart.addEventListener('click', () => { 
  gameOver()
})






