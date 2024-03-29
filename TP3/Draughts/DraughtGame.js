GAMESTATE = {
  RUNNING: 1,
  ANIMATION: 2,
  GAME_FINISHED: 3,
  REPLAY: 4,
}

TURN = {
  WHITES: 1,
  BLACKS: 2,
  NONE: 3,
}

OWNER = {
  HUMAN: 0,
  CPU: 1,
}

/**
* DraughtGame
* @param gl {WebGLRenderingContext}
* @constructor
*/
function DraughtGame(game){
  //HTML
  this.players = document.getElementsByClassName("player");
  this.turnTimes = document.getElementsByClassName("timeTurn");
  this.scoreboard = document.getElementsByClassName("score")[0];
  this.time = document.getElementsByClassName("time");

  this.showInfo = document.getElementById("info");
  this.showInfo.addEventListener("click", this.showInstructions);
  this.closeInfo = document.getElementsByClassName("infoClose")[0];
  this.closeInfo.addEventListener("click", this.closeInstructions);

  this.blacksDraw = document.getElementsByClassName("draw")[0];
  this.whitesDraw = document.getElementsByClassName("draw")[1];

  this.waitingFinish = document.getElementById("gameWinner");
  //construtor

  if (game===undefined){
    this.moves = [];
    this.standByMove = null;
    this.whitesOwner = OWNER.HUMAN;
    this.blacksOwner = OWNER.HUMAN;
    this.gameState = GAMESTATE.RUNNING;
    this.turn = TURN.BLACKS;
    this.changeTurn = true;
    this.depth = 5;
    this.started = false;

    this.board = new DraughtMap();
    this.replayBoard = new DraughtMap();
    this.moveReplayIndex = 0;

    this.IDGamma = [0, Math.pow(this.board.getsizeN(), 2) -1];
    this.whitesDrawID = 99;
    this.blacksDrawID = 100;

    this.elapsedTime = 0;
    this.timeBeforeNewGame = 5;
    this.elapsedGameFinishedTime = 0;
    this.turnTimeLimited = true;
    this.timeForTurn = 60;
    this.elapsedTurnTime = 0;

    this.lastWinner = null;

    if(this.whitesOwner == OWNER.HUMAN){
      this.whites = new Player("Whites");
    }
    else if(this.whitesOwner == OWNER.CPU){
      this.whites = new Computer("Whites", Math.floor(this.depth));
    }

    if(this.blacksOwner == OWNER.HUMAN){
      this.blacks = new Player("Blacks");
    }
    else if(this.blacksOwner == OWNER.CPU){
      this.blacks = new Computer("Blacks", Math.floor(this.depth));
    }

    //Turn Color
    this.players[0].setAttribute("style","color:yellow;");
    this.players[1].setAttribute("style","color:white");
  }
  else {
    this.moves = [];
    for(let i = 0;i < game['moves'].length;i++){
      // Move(startingPos, finalPos, turn, forcedMove, promotedPiece, capturedPiece)
      let move = game['moves'][i];
      let startingPos = move['startingPos'];
      let finalPos = move['finalPos'];
      this.moves.push(new Move(startingPos,finalPos,move['turn'],move['forcedMove'],move['promotedPiece'],move['capturedPiece']));
    }

    this.standByMove = game['standByMove'];
    this.whitesOwner = game['whitesOwner'] == 0 ? OWNER.HUMAN : OWNER.CPU;
    this.blacksOwner = game['blacksOwner'] == 0 ? OWNER.HUMAN : OWNER.CPU;
    this.gameState = game['gameState'];
    this.turn = game['turn'];
    this.changeTurn = game['changeTurn'];
    this.depth = game['depth'];
    this.started = game['started'];

    // DraughtMap(map , capturedWhites, capturedBlacks)
    this.board = new DraughtMap(game['board']['map'],game['board']['capturedWhites'],game['board']['capturedBlacks'], game['board']['movesN']);
    this.replayBoard = new DraughtMap(game['replayBoard']['map'],game['replayBoard']['capturedWhites'],game['replayBoard']['capturedBlacks'], game['board']['movesN']);
    this.moveReplayIndex = game['moveReplayIndex'];

    this.IDGamma = game['IDGamma'];
    this.whitesDrawID = game['whitesDrawID'];
    this.blacksDrawID = game['blacksDrawID'];

    this.elapsedTime = game['elapsedTime'];
    this.timeBeforeNewGame = game['timeBeforeNewGame'];
    this.elapsedGameFinishedTime = game['elapsedGameFinishedTime'];
    this.turnTimeLimited = game['turnTimeLimited'];
    this.timeForTurn = game['timeForTurn'];
    this.elapsedTurnTime = game['elapsedTurnTime'];

    this.lastWinner = game['lastWinner'];

    if(game['whitesOwner'] == OWNER.HUMAN){
      this.whites = new Player("Whites",game['whites']);
    }
    else if(game['whitesOwner'] == OWNER.CPU){
      this.whites = new Computer("Whites", Math.floor(this.depth),game['whites']);
    }

    if(game['blacksOwner'] == OWNER.HUMAN){
      this.blacks = new Player("Blacks",game['blacks']);
    }
    else if(game['blacksOwner'] == OWNER.CPU){
      this.blacks = new Computer("Blacks", Math.floor(this.depth),game['blacks']);
    }

    //Draws HTML
    if(this.whites.wantsDraw()){
      this.whitesDraw.setAttribute("style","visibility: visible;");
    }
    else{
      this.whitesDraw.setAttribute("style","visibility: hidden;");
    }

    if(this.blacks.wantsDraw()){
      this.blacksDraw.setAttribute("style","visibility: visible;");
    }
    else{
      this.blacksDraw.setAttribute("style","visibility: hidden;");
    }


    let d = new Date();
    this.startTime = d.getTime() - game['elapsedTime']*1000;

    this.currentTime = d.getTime();
    this.turnStartTime = d.getTime() - game['elapsedTurnTime']*1000;
    this.startFinishedTime = d.getTime() - game['elapsedGameFinishedTime']*1000;

    //Turn Color
    switch(this.turn){
      case 1:{
        this.players[1].setAttribute("style","color:yellow;");
        this.players[0].setAttribute("style","color:white");
      }
      break;
      case 2:{
        this.players[0].setAttribute("style","color:yellow;");
        this.players[1].setAttribute("style","color:white");
      }
      break;
      default:
      break;
    }

    this.updatePlayersScoreboard();
    this.updateScoreboard();
  }
}

/**
* Return DraughtGame gameState.
*/
DraughtGame.prototype.getgameState = function(){
  return this.gameState;
}

/**
* Return DraughtGame turn.
*/
DraughtGame.prototype.getTurn = function (){
  return this.turn;
}

/**
* Return DraughtGame board.
*/
DraughtGame.prototype.getBoard = function(){
  return this.board;
}

/**
* Return DraughtGame replayBoard.
*/
DraughtGame.prototype.getReplayBoard = function(){
  return this.replayBoard;
}

/**
* When piece is Picked.
* @param {number} id
*/
DraughtGame.prototype.picked = function (id){
  let move = null;

  if(id == this.whitesDrawID && this.started){
    this.whites.toggleDraw();
    //HTML
    if(this.whites.wantsDraw())
      this.whitesDraw.setAttribute("style","visibility: visible;");
    else
      this.whitesDraw.setAttribute("style","visibility: hidden;");
    return;
  }
  if(id == this.blacksDrawID && this.started){
    this.blacks.toggleDraw();
    //HTML
    if(this.blacks.wantsDraw())
      this.blacksDraw.setAttribute("style","visibility: visible;");
    else
      this.blacksDraw.setAttribute("style","visibility: hidden;");
    return;
  }

  if (id < this.IDGamma[0] || id > this.IDGamma[1]){
    return;
  }

  if (this.gameState != GAMESTATE.RUNNING){
    return;
  }

  if(this.turn == TURN.WHITES && this.whites instanceof Player){
    move = this.whites.createMove(id, this.board);
  }
  else if(this.turn == TURN.BLACKS && this.blacks instanceof Player){
    move = this.blacks.createMove(id, this.board);
  }

  //if valid move
  if (move != null && DraughtAux.checkValidMove(move, this.board)){
    this.forceConsecutiveMoves(move);
    this.standByMove = move;
  }
}

/**
* Force Consecutive Move on  DraughtGame.
* @param {Move} move
*/
DraughtGame.prototype.forceConsecutiveMoves = function(move){
  let startingPos, finalPos, cell;
  startingPos = move.getStartingPos();
  finalPos =  move.getFinalPos();
  cell = this.board.getPos(startingPos[0], startingPos[1]);

  if(move.isforcedMove()){
    let furtherForcedMoves = DraughtAux.ObtainForcedMovesForPiece(finalPos, this.board, cell);
    if(furtherForcedMoves.length>0){
      this.changeTurn = false;
      if(this.turn == TURN.WHITES){
        this.whites.forceConsecutiveMove(finalPos);
      }
      else if(this.turn == TURN.BLACKS){
        this.blacks.forceConsecutiveMove(finalPos);
      }
    }
    else{
      this.changeTurn = true;
      if(this.turn == TURN.WHITES){
        this.whites.toggleOFFselectLOCK();
      }
      else if(this.turn == TURN.BLACKS){
        this.blacks.toggleOFFselectLOCK();
      }
    }
  }
}

/**
* Updates DraughtGame turn.
*/
DraughtGame.prototype.nextTurn = function(){
  this.started = true;

  if(this.changeTurn){
    switch(this.turn){
      case (TURN.BLACKS):{
        this.turn = TURN.WHITES;
        //Turn Color
        this.players[1].setAttribute("style","color:yellow;");
        this.players[0].setAttribute("style","color:white");
      }
      break;
      case (TURN.WHITES):{
        this.turn = TURN.BLACKS;
        //Turn Color
        this.players[0].setAttribute("style","color:yellow;");
        this.players[1].setAttribute("style","color:white");
      }
      break;
      default:
      break;
    }
    this.elapsedTurnTime = 0;
    this.turnStartTime = this.currentTime;
  }
  else{
    this.changeTurn = true;
  }
}

/**
* Undo Last Move on DraughtGame.
*/
DraughtGame.prototype.undoMove = function(){
  //If we have made a move & at least one of the players is human
  if(this.moves.length > 0 && ((this.whites instanceof Player) || (this.blacks instanceof Player))){
    let move;
    move = this.moves.pop();
    this.board.undoMove(move);
    this.turn = move.getTurn();
    while((this.turn == TURN.BLACKS && this.blacks instanceof Computer) || (this.turn == TURN.WHITES && this.whites instanceof Computer)){
      move = this.moves.pop();
      this.board.undoMove(move);
      this.turn = move.getTurn();
    }
  }
}

/**
* Updates DraughtGame HTML scoreboard.
*/
DraughtGame.prototype.updateScoreboard = function(){
  this.timeElapsed = (this.currentTime - this.startTime)/1000;
  let minutes = ("0" + parseInt(this.timeElapsed/60)).slice(-2);
  let seconds = ("0" + parseInt(this.timeElapsed%60)).slice(-2);
  this.scoreboard.innerHTML = '<span class="time">' + minutes + ':' + seconds + '</span>' + this.blacks.wins + ' - ' + this.whites.wins;
}

/**
* Updates DraughtGame.
* @param {number} deltaTime
*/
DraughtGame.prototype.update = function(deltaTime){
  let move = null, animation = null, winner = null;
  //deltaTime is in ms

  switch(this.gameState){
    case (GAMESTATE.RUNNING):{
      if(this.standByMove != null){
        this.nextTurn();
        this.gameState = GAMESTATE.ANIMATION;
        break;
      }

      if(this.started && this.turnTimeLimited){
        if(this.elapsedTurnTime >= this.timeForTurn){
          this.playerWon(DraughtAux.getOppositeTurn(this.turn));
          this.gameState = GAMESTATE.GAME_FINISHED;
          this.startFinishedTime = this.currentTime;
          break;
        }
      }

      winner = DraughtAux.isGameOver(this.board, this.turn);
      if(winner != null){
        this.playerWon(winner);
        this.gameState = GAMESTATE.GAME_FINISHED;
        this.startFinishedTime = this.currentTime;
        break;
      }

      if(this.checkDraw()){
        this.gameState = GAMESTATE.GAME_FINISHED;
        this.startFinishedTime = this.currentTime;
        this.lastWinner = "draw";
        break;
      }

      if(this.whites instanceof Computer || this.blacks instanceof Computer){
        this.computerPlay();
      }
    }
    break;
    case (GAMESTATE.ANIMATION):{
      animation = this.standByMove.getAnimation();
      if(animation.isDone()){
        this.moves.push(this.standByMove);
        this.board.makeMove(this.standByMove);
        this.standByMove = null;
        this.gameState = GAMESTATE.RUNNING;
        animation.resetAnimation(); // so it can be replayed
      }
      animation.update(deltaTime);
    }
    break;
    case (GAMESTATE.REPLAY):{
      if((this.moves.length > 0) && (this.moveReplayIndex < this.moves.length)){
        this.standByMove = this.moves[this.moveReplayIndex];
        animation = this.standByMove.getAnimation();
        if(animation.isDone()){
          this.replayBoard.makeMove(this.moves[this.moveReplayIndex]);
          animation.resetAnimation(); // u never know
          this.moveReplayIndex++;
          this.standByMove = null;
        }
        animation.update(deltaTime);
      }
      else {
        this.gameState = GAMESTATE.RUNNING;
      }
    }
    break;
    case (GAMESTATE.GAME_FINISHED):{
      this.updateScoreboard();
      this.updatePlayersScoreboard();
      this.started = false;
      this.waitingFinish.setAttribute("style","display:block;");

      if(this.elapsedGameFinishedTime >= this.timeBeforeNewGame){
        this.waitingFinish.setAttribute("style","display:none;");
        this.restartGame();
        this.elapsedGameFinishedTime = 0;
        this.gameState = GAMESTATE.RUNNING;
        break;
      }
    }
    break;
    default:
    break;
  }
}

/**
* Computer plays in DraughtGame.
*/
DraughtGame.prototype.computerPlay = function(){
  let move = null;

  if(this.turn == TURN.WHITES && this.whites instanceof Computer){
    move = this.whites.createMove(this.board);
  }
  else if(this.turn == TURN.BLACKS && this.blacks instanceof Computer){
    move = this.blacks.createMove(this.board);
  }

  if(move != null){
    this.forceConsecutiveMoves(move);
    this.standByMove = move;
  }
}

/**
* Return if DraughtGame is draw.
*/
DraughtGame.prototype.checkDraw = function(){
  if(this.whites.wantsDraw() && this.blacks.wantsDraw()){
    return true;
  }

  return this.board.isDraw();
}

/**
* Return which Player has won.
*/
DraughtGame.prototype.playerWon = function(player){
    if(player == TURN.WHITES){
      this.whites.won();
      this.lastWinner = "whites";
    }
    else if(player == TURN.BLACKS){
      this.blacks.won();
      this.lastWinner = "blacks";
    }
}

/**
* Resets DraughtGame.
*/
DraughtGame.prototype.resetGame = function(){
  this.moves = [];
  this.standByMove = null;
  this.gameState = GAMESTATE.RUNNING;
  this.turn = TURN.BLACKS;
  this.changeTurn = true;
  this.started = false;

  this.board.resetMap();
  this.replayBoard.resetMap();
  this.moveReplayIndex = 0;

  this.startTime = null;
  this.currentTime = null;
  this.turnStartTime = null;
  this.startFinishedTime = null;
  this.elapsedTime = 0;
  this.elapsedTurnTime = 0;
  this.elapsedGameFinishedTime = 0;

  if(this.whitesOwner == OWNER.HUMAN){
    this.whites = new Player("Whites");
  }
  else if(this.whitesOwner == OWNER.CPU){
    this.whites = new Computer("Whites", Math.floor(this.depth));
  }

  if(this.blacksOwner == OWNER.HUMAN){
    this.blacks = new Player("Blacks");
  }
  else if(this.blacksOwner == OWNER.CPU){
    this.blacks = new Computer("Blacks", Math.floor(this.depth));
  }

  //Reset Draws HTML
  this.whitesDraw.setAttribute("style","visibility: hidden;");
  this.blacksDraw.setAttribute("style","visibility: hidden;");

  //Turn Color
  this.players[0].setAttribute("style","color:yellow;");
  this.players[1].setAttribute("style","color:white");

  //Scoreboard
  this.time[0].innerHTML = '00:00';
  this.turnTimes[0].setAttribute("style","");
  this.turnTimes[0].innerHTML = '';
  this.turnTimes[1].setAttribute("style","");
  this.turnTimes[1].innerHTML = '';

  this.updatePlayersScoreboard();
  this.updateScoreboard();
}

/**
* Updates DraughtGame Players HTML Scoreboard.
*/
DraughtGame.prototype.updatePlayersScoreboard = function(){
  let blacks = '<span class="timeTurn" id="time1"></span><img src="scenes/images/black_checker.jpg"/>';
  let whites = '<span class="timeTurn" id="time2"></span><img src="scenes/images/white_checker.jpg"/>';
  let cpuVScpu = (this.blacks instanceof Computer) && (this.whites instanceof Computer);

  if(this.blacks instanceof Player){
    blacks += 'Player 1';
  }
  else if(cpuVScpu){
    blacks += 'CPU 1';
  }
  else {
    blacks += 'CPU';
  }

  if(this.whites instanceof Player){
    whites += 'Player 2';
  }
  else if(cpuVScpu){
    whites += 'CPU 2';
  }
  else {
    whites += 'CPU';
  }

  this.players[0].innerHTML = blacks;
  this.players[1].innerHTML = whites;
}

/**
* Replays DraughtGame since first move.
*/
DraughtGame.prototype.replayGame = function(){
  if(this.moves.length > 0){
    this.moveReplayIndex = 0;
    this.replayBoard.resetMap();
    this.gameState = GAMESTATE.REPLAY;
  }
}

/**
* Restarts DraughtGame.
*/
DraughtGame.prototype.restartGame = function(){
  this.moves = [];
  this.standByMove = null;
  this.turn = TURN.BLACKS;
  this.changeTurn = true;
  this.started = false;

  this.board.resetMap();
  this.replayBoard.resetMap();
  this.moveReplayIndex = 0;

  if(this.whites.wantsDraw()){
    this.whites.toggleDraw();
    this.whitesDraw.setAttribute("style","visibility: hidden;");
  }

  if(this.blacks.wantsDraw()){
    this.blacks.toggleDraw();
    this.blacksDraw.setAttribute("style","visibility: hidden;");
  }

  //Turn Color
  this.players[0].setAttribute("style","color:yellow;");
  this.players[1].setAttribute("style","color:white");

  //Scoreboard
  this.time[0].innerHTML = '00:00';
  this.turnTimes[0].setAttribute("style","");
  this.turnTimes[0].innerHTML = '';
  this.turnTimes[1].setAttribute("style","");
  this.turnTimes[1].innerHTML = '';
  this.startTime = null;
}

/**
* Set DraughtGame startTime.
* @param {number} currTime
*/
DraughtGame.prototype.setStartTime = function(currTime){
  this.startTime = currTime;
  this.turnStartTime = currTime;
}

/**
* Display DraughtGame elapsedTime and elapsedTurnTime.
* @param {number} currTime
*/
DraughtGame.prototype.displayTime = function(currTime){
  //Game Time
  this.currentTime = currTime;
  this.elapsedTime = (currTime - this.startTime)/1000;
  let minutes = ("0" + parseInt(this.elapsedTime/60)).slice(-2);
  let seconds = ("0" + parseInt(this.elapsedTime%60)).slice(-2);
  this.time[0].innerHTML = minutes +':'+seconds;

  //Turn Time
  if(!this.turnTimeLimited){
    this.turnTimes[0].innerHTML = '';
    this.turnTimes[1].innerHTML = '';
    return;
  }

  let time = (currTime - this.turnStartTime)/1000;
  minutes = ("0" + parseInt(time/60)).slice(-2);
  seconds = ("0" + parseInt(time%60)).slice(-2);

  this.elapsedTurnTime = time;

  switch(this.turn){
    case (TURN.BLACKS):{
      if(this.blacks instanceof Player){
        this.turnTimes[0].innerHTML = minutes +':'+seconds;
      }
      this.turnTimes[1].innerHTML = '';
    }
    break;
    case (TURN.WHITES):{
      if(this.whites instanceof Player){
        this.turnTimes[1].innerHTML = minutes +':'+ seconds;
      }
      this.turnTimes[0].innerHTML = '';
    }
    break;
    default:
    break;
  }
}

/**
* Updates DraughtGame times when is on Replay Mode.
* @param {number} currTime
*/
DraughtGame.prototype.continueTime = function(currTime){
  this.currentTime = currTime;
  this.startTime = this.currentTime - this.elapsedTime*1000;
  this.turnStartTime = this.currentTime - this.elapsedTurnTime*1000;
}

/**
* Display DraughtGame elapsedGameFinishedTime and HTML popup.
* @param {number} currTime
*/
DraughtGame.prototype.displayFinishedTime = function(currTime){
  let time = (currTime - this.startFinishedTime)/1000;
  let minutes = ("0" + parseInt(time/60)).slice(-2);
  let seconds = ("0" + parseInt(time%60)).slice(-2);

  this.elapsedGameFinishedTime = time;

  let winner = document.getElementById("winner");
  let starts = document.getElementById("waitingStart");
  let cpuVScpu = (this.blacks instanceof Computer) && (this.whites instanceof Computer);

switch(this.lastWinner){
  case 'blacks':{
    if(this.blacks instanceof Player){
      winner.innerHTML = "Player 1 WON!";
    }
    else if(cpuVScpu){
      winner.innerHTML = "CPU 1 WON!";
    }
    else{
      winner.innerHTML = "CPU WON!";
    }
  }
  break;
  case 'whites':{
    if(this.whites instanceof Player){
      winner.innerHTML = "Player 2 WON!";
    }
    else if(cpuVScpu){
      winner.innerHTML = "CPU 2 WON!";
    }
    else{
      winner.innerHTML = "CPU WON!";
    }
  }
  break;
  case 'draw':{
    winner.innerHTML = "DRAW!";
  }
  break;
  default:
  break;
}

  let countdown = parseInt(this.timeBeforeNewGame - this.elapsedGameFinishedTime) + 1;
  starts.innerHTML = "New Game starts in " + countdown + "...";
}

/**
* Show DraughtGame Instructions.
*/
DraughtGame.prototype.showInstructions = function(){
  let info = document.getElementById("gameInstructions");
  info.style.display = "block";
}

/**
* Close DraughtGame Instructions.
*/
DraughtGame.prototype.closeInstructions = function(){
  let info = document.getElementById("gameInstructions");
  info.style.display = "none";
}

/**
* Close DraughtGame Instructions.
*/
window.onclick = function(event) {
  let info = document.getElementById("gameInstructions");
    if (event.target == info) {
        info.style.display = "none";
    }
}
