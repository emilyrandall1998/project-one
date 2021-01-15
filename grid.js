// ? SQUARE GRID:
const grid = document.querySelector('.grid')
// ? Specify the width of the grid.
const width = 14
const height = 13
const cells = []
let scooby = 6

for (let index = 0; index < width * height; index++) {
  // ? Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  // ? Number each cell by its index.
  cell.innerHTML = index
  // ? Set the width and height of my cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / height}%`
}
// ! This block of code is super common
cells[scooby].classList.remove('scooby')
scooby += 1
cells[scooby].classList.add('scooby')

document.addEventListener('keyup', (event) => {
  const key = event.key

  if (key === 'ArrowRight' && !(scooby % width === width - 1)) {
    cells[scooby].classList.remove('scooby')
    scooby += 1
    cells[scooby].classList.add('scooby')
  // ? This below line if for if you don't want to boundary the whole wall.
  // } else if (key === 'a' && !(scooby === 0)) {
  } else if (key === 'ArrowLeft' && !(scooby % width === 0)) {
    cells[scooby].classList.remove('scooby')
    scooby -= 1
    cells[scooby].classList.add('scooby')
  } else if (key === 'ArrowDown' && !(scooby + width >= width ** 2)) {
    cells[scooby].classList.remove('scooby')
    scooby += width
    cells[scooby].classList.add('scooby')
  } else if (key === 'ArrowUp' && !(scooby < width)) {
    cells[scooby].classList.remove('scooby')
    scooby -= width
    cells[scooby].classList.add('scooby')
  }
})