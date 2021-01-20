const grid = document.querySelector('.grid')
const start = document.querySelector('.start')
const restart = document.querySelector('.restart')
const scoreTotal = document.querySelector('.score')
const livesTotal = document.querySelector('.lifeRemaining')
const timeTotal = document.querySelector('.timeRemaining')
const width = 16
const height = 13
const cells = []
let scooby = 199
//? creating an array of right to left villains: 
let rightVilStart = [126, 121, 116, 156, 151, 146, 190, 185, 180] //! trying to assign those values to cells
//? creating an array of villains coming in from left to right
let leftVilStart = [129, 132, 135, 138, 141, 161, 164, 167, 170, 173]
//? these two variables below are the out of bound cells where the avatar cannot go (with no background)
let rightMystStartFront = [45, 41, 37, 33, 77, 73, 69, 65]
let rightMystStartBack = [46, 42, 38, 34, 78, 74, 70, 66]
let leftMystStartFront = [20, 24, 28, 52, 56, 60, 84, 88, 92]
let leftMystStartBack =[19, 23, 27, 51, 55, 59, 83, 87, 91]
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
scoreTotal.innerHTML = score
livesTotal.innerHTML = lives
timeTotal.innerHTML = time

//? create the grid
for (let index = 0; index < width * height; index++) {
  //* generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  //* number each cell by its index.
  cell.innerHTML = index
  //* set the width and height of cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / height}%`
}
//? common code block - adds Scooby avatar
cells[scooby].classList.remove('scooby')
scooby += 1
cells[scooby].classList.add('scooby')

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
    cells[i].classList.add('villainsFromRight') //? adding the villainsFromRight to their starting positions 
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
// console.log(rightVilStart)
// console.log(leftVilStart)
// console.log(outOfBoundsRight)
// console.log(outOfBoundsLeft)
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
        // console.log(villain)
        // console.log(rightVilStart)
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
}

// let scoobyChar = 'scooby'
// let shaggyChar = 'shaggy'
// let character = scoobyChar
// // let changeChar = changeChar() {
// // if (character === scoobyChar && cells(//!end cells )){
// // character = shaggyChar
// }
// // }

function moveCharacter() {
    //? to allow scooby to move around inside the grid's borders and only escape in DZ2
    document.addEventListener('keyup', (event) => {
      const key = event.key
      const leftBound = [1, 97, 113, 129, 145, 161, 177, 193]
      const rightBound = [14, 110, 126, 142, 158, 174, 190, 206]
      // console.log(rightBound)
      if (key === 'ArrowRight' && !(rightBound.includes(scooby))) {
        cells[scooby].classList.remove('scooby')
        scooby += 1
        cells[scooby].classList.add('scooby')
      } else if (key === 'ArrowLeft' && !(leftBound.includes(scooby))) {
        cells[scooby].classList.remove('scooby')
        scooby -= 1
        cells[scooby].classList.add('scooby')
      } else if (key === 'ArrowDown' && !(scooby + width >= width * height)) {
        cells[scooby].classList.remove('scooby')
        scooby += width
        cells[scooby].classList.add('scooby')
      } else if (key === 'ArrowUp' && !(scooby < width)) {
        cells[scooby].classList.remove('scooby')
        scooby -= width
        cells[scooby].classList.add('scooby')
      }
    })
}

function resetChar() {
  cells[scooby].classList.remove('scooby')
  scooby = 199
  cells[scooby].classList.add('scooby')
}

//? function for the character to lose 
function loseLife() {
  const loseLifeInterval = setInterval(() => {
    if ((cells[scooby].classList.contains('villainsFromRight') || cells[scooby].classList.contains('villainsFromLeft')) && lives > 0) {
      console.log('lose a life')
      livesTotal.innerHTML = lives -= 1
      resetChar()
      clearInterval(loseLifeInterval)
    } else if (lives === 0) {
      alert('Zoinks, you lost! Refresh the page to play again!')
      gameOver()
  }
  }, 500)
}

function gameOver() {
  if (lives === 0 || time === 0) {
    // console.log('GAME OVER')
    // document.removeEventListener('keyup', function(event))
    clearInterval(mystRightID)
    clearInterval(mystLeftID)
    clearInterval(villainLeftID)
    clearInterval(villainRightID)
    time = 30
    lives = 3
    score = 0
    timeTotal.innerHTML = `${time}`
    livesTotal.innerHTML = `${lives}`
    scoreTotal.innerHTML = `${score}`
    console.log(lives)
    clearInterval(intervalID)
  }
}

//? the character wins the game 
function win() {
  const safeZone = cells[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  if (time >= 0 && cells[scooby].classList.contains('safeZone')) {
    console.log('u safe')
    score += 100
    scoreTotal.innerHTML = `${score}`
    resetChar()
  }
  if (score === 500) {
    cells[scooby].classList.remove('scooby')
    alert('You win! Treat yourself to a Scooby Snack!')
  }
  console.log(safeZone)
}

start.addEventListener('click', () => {
  moveCharacter()
  movePieces()
  //? click start, the timer begins, if timer runs out lose a life and put scooby back at the start  
  //! just swapped the if statements around and that made it worse
  intervalID = setInterval(() => {
    if (time >= 0) {
      timeTotal.innerHTML = time
      time--
      loseLife()
      win()
    } else {
      gameOver()
      console.log('out of time')
      console.log(time)
      livesTotal.innerHTML = lives - 1
      // timeTotal.innerHTML = 0
      cells[scooby].classList.remove('scooby')
      // cells[199].classList.add('scooby')
      time = 30 //? this isn't working??
      clearInterval(intervalID)
      //! need to remove the event listener and start the interval/click action again
      // button.removeEventListener() //? <-- to make sure the interval restarts immediately without having to click start again?
    }
  }, 1000)
})

restart.addEventListener('click', () => {
  moveCharacter()
  timeTotal.innerHTML = 30
  scoreTotal.innerHTML = 0
  lives = 3
  intervalID = 0
  clearInterval(intervalID)
  cells[scooby].classList.remove('scooby')
  cells[199].classList.add('scooby')
})






