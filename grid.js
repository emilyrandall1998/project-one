const grid = document.querySelector('.grid')
const button = document.querySelector('button')
const width = 16
const height = 13
const cells = []
let scooby = 199
const outOfBoundsLeft = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192]
const outOfBoundsRight = [15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207]
const score = document.querySelector('.score')
const lives = document.querySelector('.lifeRemaining')
let lifeRemaining = 3
let totalScore = 0
console.log(lifeRemaining)

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

  if (outOfBoundsLeft.includes(i)) {
    cells[i].style.background = 'none'
    // cells[i].style.backgroundColor = '#24529c'
    // cells[i].style.color = '#24529c'
  }

  if (outOfBoundsRight.includes(i)) {
    cells[i].style.background = 'none'
    // cells[i].style.backgroundColor = '#24529c'
    // cells[i].style.color = '#24529c'
  }
}

//? function that should say: if L is pressed while Scooby is in DZ2 AND he is at one of the boundary indexes, lose a life and return to start position??
// function outOfBoundsLeft() {
//   for (let i = 0; i <= cells.length; i++) {
//     if ((scooby[i] >= 14 && scooby[i] <= 83) && dZ2Left[scooby]) {
//       cells[scooby].classList.remove('scooby')
//       scooby -= 1
//       cells[174].classList.add('scooby') //! back to the start position
//       lifeRemaining -= 1
//       // console.log('Out of bounds')
//       console.log(lifeRemaining)
//     } else if (!scooby % width === 0) {

//     }
//   }
// }
//? create an out of bounds zone Left and Right
for (let i = 0; i < outOfBoundsLeft.length; i++) {
  cells[i].classList.add('OOBLeft')
}
for (let i = 0; i < outOfBoundsRight.length; i++) {
  cells[i].classList.add('OOBRight')
}

console.log(outOfBoundsRight)
console.log(outOfBoundsLeft)

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

 

//! ArrowLeft correct funtion: !(scooby % width === 0)
//! ArrowRight: scooby % width === width - 1

function win() {
  const safeZone = cells[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  if (cells[safeZone].classList.contains('scooby'))
  alert('YOU WIN')
}

//? game interval of 30 seconds - do i need to nest everything inside this?
button.addEventListener('click', () => {
  setInterval(() => {

  }, 30000)
})