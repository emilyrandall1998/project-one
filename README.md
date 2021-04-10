![GA Logo](./images/GALogo.png)
# Project 1 - Scooby-Doo themed 'Frogger'
![Scooby Icon](Images/Scooby-Doo.png) 
## Overview
For my first General Assembly SEI project I recreated the retro game 'Frogger' using vanilla JavaScript, HTML and CSS, giving it a Scooby-Doo theme.  

You can try it out using the link provided [here](https://emilyrandall1998.github.io/project-one/)!

## Project brief
- Render a game in the browser.
- Design logic for winning & visually display which player won.
- Include separate HTML / CSS / JavaScript files.
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles.
- Use **Javascript** for **DOM manipulation**.
- **Deploy your game online**, where the rest of the world can access it.
- Use **semantic markup** for HTML and CSS (adhere to best practices).

## Technologies used
- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts

## Approach
### Creating the grid 
I created the grid mainly using JavaScript using a **div** created in the HTML file, which I made into a flex item within the flex container of the **body**. I use a for loop to generate each element (cell) of the grid, and within the for loop I created a 'cell' variable that creates the array of cell divs to sit within the grid div:

```
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
```
I made the grid a cell wider on each side than it appears online, as the far right and left columns are used as invisible 'out of bound' zones that can detect if a character is carried off the grid by a Mystery Machine in the second danger zone.

I gave the grid div a specific height and width, so that it remains the same size on all screen sizes. This is something I would change if I were to later implement responsive design. 
### Adding classes and styling
To change the background colour of the different 'zones' of the game, and also to add in the various moving objects to their starting array positions, I created another for loop to loop through the length of the cells array. I then use if statements to change the appearance of different aspects of my grid via classes:

```
if (i >= 0 && i <= 15) {
    cells[i].classList.add('safeZone')
```
and JavaScript styling:

```
else if (i >= 16 && i <= 95) {
    cells[i].style.backgroundColor = '#f5f5f5'
    cells[i].style.borderTop = '1px solid #d3d3d3'
    cells[i].style.borderBottom = '1px solid #d3d3d3'
    }
```
### Character generation
To generate each character of the Mystery Gang after 100 points are added to the score, I kept track of the overarching 'characterPosition' using a let variable, and another 'character' variable to track which character is currently on the board. I made each character their own class using CSS, and gave them each a variable equal to a string:

```
let scoobyChar = 'scooby'
```
I then used a function to change the character dependent on the score and current character class: 

```
if (character === scoobyChar && cells[characterPosition].classList.contains('safeZone') && score < 200) {
    character = shaggyChar
```

### Functionality
#### Moving the obstacles
Within the game board I have two danger zones. The first has villains coming in from the right and left hand sides of the board, which the character has to dodge in order to avoid losing a life. The second danger zone is a kind of inversion of this - you have to jump onto the moving vans in order to get across the road, and if the character touches the road you lose a life. 

All of the obstacles are present on the board from the beginning of the game, each side within it's own starting array: 

```
let rightVilStart = [126, 121, 116, 156, 151, 146, 190, 185, 180] 
let rightMystStartFront = [45, 41, 37, 33, 77, 73, 69, 65]
let rightMystStartBack = [46, 42, 38, 34, 78, 74, 70, 66]
``` 
Within separate functions, I then use set intervals to make the villains and vans move across the screen every second or so after the start button is pressed. I also use a forEach statement to make all the cells with a villain or van class move simultaneously, depending on which side they're coming from, with a condition that states if that class if found within an 'out of bounds' cell it is sent back to the starting position. I use the same idea to make the vans move, however in order to make them two cells wide with one .png image, I had to split the image and movement into two parts: 

```
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
``` 
Getting the character to move with the van turned out to be a lot simpler than I thought it would be - the harder part was getting the obstacles moving to begin with! To get the character moving with the van, I used another set interval to check which row the character is on, and then if the cell with that character also contains the classList of van, it moves the character in the same direction using a mirrored set interval command.

#### Collision detection 
To check whether the character needs to lose a life, I created a loseLife() function that features another set interval. This function checks for three 'collision' events, as well as time/lives running out:
 
1) Whether the cell containing the character position contains a classList of villain

2) Whether the cell containing the character position **doesn't** contain a classList of van

3) Whether the the cell containing character position is within an 'out of bounds' column

### Event listeners 
I used three event listeners throughout the game: 

1) A start button event listener to set off the timer, begin the obstacle movement intervals and triggers the move character event listener 

2) A restart button to set the timer interval which essentially implements the gameOver() function - resets the intervals and returns the time, score and lives back to their starting values

3) A keyup event listener that allows the characters to be moved by the user using the arrow keys

### Bugs and difficulties 
I had one pretty persistent bug towards the end of the week that meant when it came to the fifth character being played, when it got to the second danger zone (where the vans are moving) it would always push the character off the van and into the road before it could reach the win zone - preventing you from winning. This was a lot more frequent when playing after using the restart button instead of refreshing the page. I realised that I had missed clearing these interval IDs in the gameOver function: 

```
clearInterval(moveWithVanLeftInterval)
clearInterval(moveWithLogoRightInterval)
```

This eliminated the problem of playing after using the restart button, although I found that the game still sometimes killed the fifth character on the first round of playing. However, for some reason this issue seemed to go away with deployment/occurred less frequently. Also, time not going to 0 when you die, not returning the obstacles to their original starting arrays. Also having multiple event listeners doubling up and forcing the character off the van and onto the road which should technically be picked up as a 'kill zone' ALSO TALK ABOUT THE GAME = TRUE/FALSE THING 

### Future features 
- Local storage for a leaderboard 
- Generate the obstacles at random intervals
- Haunted house 'win zone' so only one character can occupy a particular space within the win zone, and if another character is already in the haunted house block, the character trying to join in is killed 
- Get extra points based on the amount of time remaining on the timer when a character reaches the win zone
- Level up after all characters are safely in the win zone - faster moving obstacles each level up 
- Improved CSS/styling