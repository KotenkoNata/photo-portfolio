  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));

  const scoreDisplay = document.querySelector('#score');
  const linesDisplay = document.querySelector('#lines');
  const levelDisplay = document.querySelector('#level');

  const startBtn = document.querySelector('#start-button');
  const gameOverInscription = document.querySelector('.game-over');

  const tableBody = document.querySelector('.table-body');

  const muteButton = document.querySelector('.mute-button');

  let muted = false;

  const width = 10;
  let nextRandom = 0;
  let timerId;


  let score = 0;
  let lines = 0;
  let level = 1;

  let speed = 1000;

  const colors=[
    '#800080',
    '#FF0000',
    '#0000FF',
    '#008000',
    '#FFA500'
  ];


  // converted given HEX color to more bright or more dark HEX color
  function getCalculateColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

 //sounds
  let clearSound = new Audio('./assets/sound/clear.wav');
  clearSound.volume = 0.1;

  let fallSound = new Audio('./assets/sound/land.wav');
  fallSound.volume = 0.1;

  let selectionSoundL = new Audio('./assets/sound/cursL.wav');
  selectionSoundL.volume = 0.1;

  let rotateSound = new Audio('./assets/sound/magicstep.wav');
  rotateSound.volume = 0.1;

  let selectionSoundR = new Audio('./assets/sound/cursverti.wav');
  selectionSoundR.volume = 0.1;

  let gameOverSound = new Audio('./assets/sound/gameover.wav');
  gameOverSound.volume = 0.1;

  let succeedGame = new Audio('./assets/sound/success.wav');
  succeedGame.volume = 0.1;

//The Tetrominoes
  const lTetrominoes = [
    [1, width+1, width*2+1,2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes= [lTetrominoes, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length);

  let current = theTetrominoes[random][currentRotation];

  //draw the tetromino
  function draw() {
    current.forEach(index=>{
      squares[currentPosition + index].classList.add('tetromino');

      let randomColor = colors[random];
      let darken = getCalculateColor(randomColor, -100);
      let lighter = getCalculateColor(randomColor, 150);

      squares[currentPosition + index].style.backgroundColor = randomColor;
      squares[currentPosition + index].style.border = `1px solid ${darken}`;
      squares[currentPosition + index].style.boxShadow = `inset 0 0 2px 2px ${lighter}`;
    })
  }

//undraw the Tetromino

  function undraw() {
    current.forEach(index=>{
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
      squares[currentPosition + index].style.borderColor = '';
      squares[currentPosition + index].style.boxShadow = '';
    })
  }


//assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37){
      moveLeft();
      selectionSoundL.play();
    }else if(e.keyCode === 38){
      rotate();
      rotateSound.play();
    }else if(e.keyCode === 39){
      moveRight();
      selectionSoundR.play();
    }else if(e.keyCode === 40){
      moveDown();
      selectionSoundL.play();
    }
  }

  document.addEventListener('keyup', control)

//move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function
  function freeze() {
    if(current.some(index=> squares[currentPosition + index + width].classList.contains('taken'))){
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      fallSound.play();
      //start a new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random()*theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

//move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index=>(currentPosition + index)% width === 0);

    if(!isAtLeftEdge) currentPosition -=1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1;
    }
  }

//move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index)% width === width -1);
    if(!isAtRightEdge) currentPosition +=1;
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition -=1;
    }
    draw();
  }

//rotate the tetromino

  function rotate() {
    undraw();
    currentRotation ++;
    if(currentRotation === current.length){
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

//show up-next tetromino in mini-grid display
  const  displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;


  //the Tetromino without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  //display the shape in the mini-grid display

  function displayShape() {
    displaySquares.forEach(square=>{
      square.classList.remove('tetromino');
      square.style.boxShadow = '';
      square.style.backgroundColor = '';
      square.style.borderColor = '';

    })

    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino');

      let randomColor = colors[nextRandom];
      let darken = getCalculateColor(randomColor, -100);
      let lighter = getCalculateColor(randomColor, 150);

      displaySquares[displayIndex + index].style.borderColor = `${darken}`;
      displaySquares[displayIndex + index].style.backgroundColor = randomColor;
      displaySquares[displayIndex + index].style.boxShadow = `inset 0 0 2px 2px ${lighter}`;

    })
  }

  //add functionality to the button

  startBtn.addEventListener('click', ()=>{
    if(startBtn.innerHTML==='Continue game'){
      startGame();
      clearTable();
      getLocalStorage();
    }else if(startBtn.innerHTML==='Pause game'){
      pauseGame();
    }else if(startBtn.innerHTML==='Start game'){
      startNewGame();
      clearTable();
      getLocalStorage();
    }
  })

  function startNewGame() {
    const elements = document.querySelectorAll('.grid .field');
    elements.forEach(element=>{
      element.classList.remove('tetromino');
      element.classList.remove('taken');
      element.style.backgroundColor = '';
      element.style.borderColor = '';
      element.style.boxShadow = '';
    })
    gameOverInscription.innerHTML = '';
    gameOverInscription.classList.add('invisible');
    gameOverInscription.classList.remove('success');
    gameOverInscription.classList.remove('over');


    draw();
    timerId = setInterval(moveDown, speed);
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    displayShape();
    startBtn.innerHTML = "Pause game";
  }

  function startGame() {
    draw();
    timerId = setInterval(moveDown, speed);
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    displayShape();
    startBtn.innerHTML = "Pause game";
  }

  function pauseGame() {
    clearInterval(timerId);
    timerId = null;
    startBtn.innerHTML = "Continue game";
  }

  //add score

  function addScore() {
    for(let i = 0; i< 199; i+=width){
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if(row.every(index=>squares[index].classList.contains('taken'))){
        clearSound.play();
        score +=10;
        lines +=1;
        if( score%100 === 0 ){
          level +=1;
          speed = speed - 100;
        }

        levelDisplay.innerHTML = level;
        linesDisplay.innerHTML = lines;
        scoreDisplay.innerHTML = score;

        row.forEach(index=>{
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';
          squares[index].style.borderColor = '';
          squares[index].style.boxShadow = '';
          squares[index].classList.add('animation-line');

        })
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell=>grid.appendChild(cell));
      }

    }
  }


  //checking High Score

  function checkingHighScore(score) {

    const highScore = JSON.parse(localStorage.getItem('gameScore')) || [];
    const lowestScore = highScore[10-1]?.score ?? 0;

    return score > lowestScore;
  }

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){

      clearInterval(timerId);

      const highScore = checkingHighScore(score);

      let text;

      if(highScore === false){
        gameOverSound.play();
        gameOverInscription.classList.add('over');
        text = "Your result:";
      }else {
        succeedGame.play();
        gameOverInscription.classList.add('success');
        text = "You got a highscore!";
      }

      gameOverInscription.classList.remove('invisible');
      gameOverInscription.innerHTML = `Game over!`;

      let htmlElement = `<p class="game-results">${text}</p>
        <p class="game-results">Score: ${score}</p>
        <p class="game-results">Lines: ${lines}</p>
        <p class="game-results">Level: ${level}</p>`;

      gameOverInscription.insertAdjacentHTML('beforeend', htmlElement);

      setLocalStorage();

      score = 0;
      lines = 0;
      level = 1;

      levelDisplay.innerHTML = level;
      linesDisplay.innerHTML = lines;
      scoreDisplay.innerHTML = score;

      startBtn.innerHTML = "Start game";

      clearTable();
      getLocalStorage();
    }
  }

  
  //save data to Local storage
  function setLocalStorage() {

    let gameScore = JSON.parse(localStorage.getItem('gameScore')) || [];

    const newGame = {score: `${score}`,lines: `${lines}`,level: `${level}`};

    gameScore.push(newGame);

    gameScore.sort((a,b)=>b.lines - a.lines);

    if(gameScore.length > 10){
      gameScore.pop()
    }

    localStorage.setItem('gameScore', JSON.stringify(gameScore));

  }

  function clearTable() {
    tableBody.innerHTML = '';
  }

function getLocalStorage() {
  if(localStorage.length > 0) {
    const data = JSON.parse(localStorage.getItem('gameScore'));

    data.map(item=>{
      let htmlElement = `<tr class="game-details">
                           <td>${item.score}</td>
                             <td>${item.lines}</td>
                             <td>${item.level}</td>
                         </tr>`;
           tableBody.insertAdjacentHTML('beforeend', htmlElement);
    })
  }
}

muteButton.addEventListener('click', function () {

  if(muteButton.muted === true){
    clearSound.muted = true;
    fallSound.muted = true;
    selectionSoundL.muted = true;
    rotateSound.muted = true;
    selectionSoundR.muted = true;
    gameOverSound.muted = true;
    succeedGame.muted = true;

    muteButton.children[0].children[0].href.baseVal =`./assets/img/symbol-defs.svg#icon-mute`;

    muteButton.muted = false;

  }else{
    clearSound.muted = false;
    fallSound.muted = false;
    selectionSoundL.muted = false;
    rotateSound.muted = false;
    selectionSoundR.muted = false;
    gameOverSound.muted = false;
    succeedGame.muted = false;

    muteButton.muted = true;

    muteButton.children[0].children[0].href.baseVal = `./assets/img/symbol-defs.svg#icon-speaker`;
  }

});

  console.log(`Score: 60/60;
  1. реализован интерфейс игры 5/5;
  2. в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс 5/5;
  3. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам 10/10;
  4. Реализовано завершение игры при достижении игровой цели 10/10;
  5. По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д 10/10;
  6. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр 10/10;
  7. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов 10/10;
  8. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (Mute/Unmute button) 10/10;
  `)


