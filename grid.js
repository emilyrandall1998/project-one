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
    cells[i].style.backgroundColor = '#ffc04c'
  } else if (i >= 16 && i <= 95) {
    cells[i].style.backgroundColor = '#d3d3d3'
  } else if (i >= 96 && i <= 111) {
    cells[i].style.backgroundColor = '#90EE90'
  } else if (i >= 112 && i <= 191) {
    cells[i].style.backgroundColor = '#b19cd9'
  } else if (i >= 192 && i <= 207) {
    cells[i].style.backgroundColor = '#90EE90'
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
  }
  if (outOfBoundsRight.includes(i)) {
    cells[i].style.background = 'none'
  }
}
// console.log(rightVilStart)
// console.log(leftVilStart)
// console.log(outOfBoundsRight)
// console.log(outOfBoundsLeft)


button.addEventListener('click', () => {
  if (intervalID) return 
  intervalID = setInterval(() => {
    if (time >= 0) {
      timeTotal.innerHTML = time
      time--
    } else {
      clearInterval(intervalID)
    }
      }, 1000)
  //! currently what this function does is remove the first vilFromRight class and then break?
  // let vilFromRight = cells[vilFromRight] //* keep this, then maybe say if cells contain the vilFromRight indexes, vilFromRight.map(x ==> x - 1)?

  // setInterval(() => {
  //   // const leftBound = cells[leftBound]
  //   grid.forEach((cell) => {
  //     if (cell.classList.contains('villainsFromRight')) { //? if cells.includes(rightVilStart) --> then need to map?
  //       cell.classList.remove('villainsFromRight')
  //       grid[indexOf(cell)].classList.add('villainsFromRight')
  //     }
  //     // if (cell[leftBound].classList.contains('villainsFromRight')) {
  //     //   cell.classList.remove('villainsFromRight')
  //     // }
  //   })

  //   console.log(cell)
  //   // for (let i = 190; i >= 130; i--) {
  //   //  if (cells[i].classList.contains('villainsFromRight')) {
  //   //    console.log(cells[i])
  //   //     // cells[i].classList.remove('villainsFromRight')
  //   //     // cells[i] -= 1
  //   //     // cells[i].classList.add('villainsFromRight') //! Do I need to map the rightVilStart array?! Shouldn't have to, that literally just to add the classList
  //   //   }
  //   // }
  // }, 1000)

//? to allow the character to move around inside the grid's borders and only escape in DZ2
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







// cells[villainsFromRight].classList.remove('villainsFromRight') //! you are here !!!
// villainsFromRight += 1
// cells[villainsFromRight].classList.add('villainsFromRight')

//? the character wins the game 
function win() {
  const safeZone = cells[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  if (cells[safeZone].classList.contains('scooby'))
  alert('YOU WIN')
}

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




