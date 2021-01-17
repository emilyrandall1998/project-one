const grid = document.querySelector('.grid')
const button = document.querySelector('button')
const scoreTotal = document.querySelector('.score')
const livesTotal = document.querySelector('.lifeRemaining')
const timeTotal = document.querySelector('.timeRemaining')
const width = 16
const height = 13
const cells = []
let scooby = 199
//? creating an array of right to left villains: 
let rightVilStart = [126, 121, 116, 158, 153, 148, 190, 185, 180] //! trying to assign those values to cells
//? creating an array of villains coming in from left to right
let leftVilStart = [129, 132, 135, 138, 141, 161, 164, 167, 170, 173]
//? these two variables below are the out of bound cells where the avatar cannot go (with no background)
const outOfBoundsLeft = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192]
const outOfBoundsRight = [15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207]
let lives = 3
let score = 0
let time = 30
let intervalID = 0
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
  // cell.innerHTML = index
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
    cells[i].style.backgroundColor = '#ffc04c'
  } else if (i >= 16 && i <= 95) {
    cells[i].style.backgroundColor = '#d3d3d3'
    cells[i].style.borderTop = '1px solid white'
    cells[i].style.borderBottom = '1px solid white'
  } else if (i >= 96 && i <= 111) {
    cells[i].style.backgroundImage = 'url(\'https://lh3.googleusercontent.com/proxy/p4QIF77ww6pye-gE7kyi2sDrLm3oaxhN2gzh_4DQQtio1hMao6ja_Ui_XNr6vQM2YNJFHsx2DnZPfjxaZClm8ygMww\')'
    cells[i].style.backgroundSize = 'cover'
  } else if (i >= 112 && i <= 191) {
    cells[i].style.backgroundColor = '#b19cd9'
    cells[i].style.borderTop = '1px solid yellow'
    cells[i].style.borderBottom = '1px solid yellow'
  } else if (i >= 192 && i <= 207) {
    cells[i].style.backgroundImage = 'url(\'https://lh3.googleusercontent.com/proxy/p4QIF77ww6pye-gE7kyi2sDrLm3oaxhN2gzh_4DQQtio1hMao6ja_Ui_XNr6vQM2YNJFHsx2DnZPfjxaZClm8ygMww\')'
    cells[i].style.backgroundSize = 'cover'
  }
  if (rightVilStart.includes(i)) {
    cells[i].classList.add('villainsFromRight') //? adding the villainsFromRight to their starting positions 
  }
  if (leftVilStart.includes(i)) {
    cells[i].classList.add('villainsFromLeft')
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
function moveRightVil(villainPosition) {
  let mappedVillains = villainPosition.map((cell) => {
    cell - 1
  })
  console.log(mappedVillains)
  setInterval(() => {
  if (cells.classList.contains('villainsFromRight')) {
    cells[rightVilStart].classList.remove('villainsFromRight')
    mappedVillains.classList.add('villainsFromRight')
  }
  }, 1000)
}

button.addEventListener('click', () => {
  //? click start, the timer begins, if timer runs out lose a life and put scooby back at the start 
  //! need to remove the eventlistener and re add? or maybe set the timer back to 30 and carry on? 
  if (intervalID) return 
  intervalID = setInterval(() => {
    if (time > 0) {
      timeTotal.innerHTML = time
      time--
      moveRightVil()
    } else if (time === 0) {
      // timeTotal.innerHTML = 'JINKIES! YOU\'RE OUT OF TIME!'
      livesTotal.innerHTML = lives - 1
      cells[scooby].classList.remove('scooby')
      cells[199].classList.add('scooby')
      timeTotal.innerHTML = 30
      clearInterval(intervalID)
      //! need to remove the event listener and start the interval/click action again
      // button.removeEventListener()
    }
    win()
      }, 1000)
//!BELOW ------------------------------------------------------------------------------------->
//! indexOf?
//! essentially, what I want to happen when the start button is clicked, is that in 1 second intervals, all the villainsFromRight - 1 index from their current position (using array.map?) simultaneously, and this repeats until the out of bounds LEFT index contains a classList('villainsFromRight'), at which point the interval starts from the top again, and this goes on in a continuous loop until the timer runs out (so for 30 seconds - does this need to go within the timer interval then?)
//! I think I need to make the villains move in a function and then add that to the 30000 setInterval timer, rather than putting the whole thing inside it
      // setInterval(() => {
      //   if (grid.classList.contains('villainsFromRight')) {
      //     cells.indexOf(rightVilStart).classList.remove('villainsFromRight')
      //     mappedVillains.classList.add('villainsFromRight')
      //   }
      // }, 1000)
// //* copy of original attempt to return to 
//       setInterval(() => {
//           if (rightVilStart.classList.contains('villainsFromRight')) {
//             rightVilStart.classList.remove('villainsFromRight')
//             moveRightVil()
//             mappedVillains.classList.add('villainsFromRight')
//           }
//       }, 1000)
 

//? to allow scooby to move around inside the grid's borders and only escape in DZ2
document.addEventListener('keyup', (event) => {
  const key = event.key
  const leftBound = [1, 97, 113, 129, 145, 161, 177, 193]
  const rightBound = [14, 110, 126, 142, 158, 174, 190, 206]
  console.log(rightBound)
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

})





//! IGNORE BELOW FOR NOW! ----------------------------------------------------------------->

// function start() {
//   setInterval(() => {
    //! group all the functions that move pieces into one movepieces function (function within a function)
//   }, 1000)
// }

// //? game interval of 30 seconds - do i need to nest everything inside this?
// //? the start button function sets off: the event listener for the KEYS (not the click), the villains moving, the mystery machines driving

//   button.addEventListener('click', () => {
//   start()
//   })

//? function for the character to lose 
function lose() {
  if (cells[scooby].classList.contains('villainsFromRight') || cells[scooby].classList.contains('villainsFromLeft')) {
    cells[scooby].classList.remove('scooby')
    livesTotal.innerHTML = lives - 1
    cells[199].classList.add('scooby')
  } else if (lives === 0) {
    console.log('Zoinks, you lost! Refresh the page to play again!')
  }
}

//? the character wins the game 
function win() {
  const safeZone = cells[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  if (safeZone.classList.contains('scooby')) {
  score += 100
  cells[scooby].classList.remove('scooby')
  cells[199].classList.add('scooby')
  }
  if (score === 500) {
    cells[scooby].classList.remove('scooby')
    console.log('You win! Treat yourself to a Scooby Snack!')
  }
}




