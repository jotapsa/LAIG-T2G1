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
  //construtor

  if (game===undefined){
    this.moves = [];
    this.standByMove = null;
    this.whitesOwner = OWNER.HUMAN;
    this.blacksOwner = OWNER.HUMAN;
    this.gameState = GAMESTATE.RUNNING;
    this.turn = TURN.BLACKS;
    this.changeTurn = true;
    this.depth = 10;
    this.started = false;

    this.board = new DraughtMap();
    this.replayBoard = new DraughtMap();
    this.moveReplayIndex = 0;

    this.IDGamma = [0, Math.pow(this.board.getsizeN(), 2) -1];
    this.whitesDrawID = 99;
    this.blacksDrawID = 100;

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
    this.board = new DraughtMap(game['board']['map'],game['board']['capturedWhites'],game['board']['capturedBlacks']);
    this.replayBoard = new DraughtMap(game['replayBoard']['map'],game['replayBoard']['capturedWhites'],game['replayBoard']['capturedBlacks']);
    this.moveReplayIndex = game['moveReplayIndex'];

    this.IDGamma = game['IDGamma'];
    this.whitesDrawID = game['whitesDrawID'];
    this.blacksDrawID = game['blacksDrawID'];

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

    let d = new Date();
    this.startTime = d.getTime() - game['timeElapsed']*1000;
  }

  this.players = document.getElementsByClassName("player");
  this.turnTimes = document.getElementsByClassName("timeTurn");
  this.score = document.getElementsByClassName("score");
  this.time = document.getElementsByClassName("time");

  this.showInfo = document.getElementById("info");
  this.showInfo.addEventListener("click", this.showInstructions);
  this.closeInfo = document.getElementsByClassName("infoClose")[0];
  this.closeInfo.addEventListener("click", this.closeInstructions);
}

DraughtGame.prototype.getgameState = function(){
  return this.gameState;
}

DraughtGame.prototype.getTurn = function (){
  return this.turn;
}

DraughtGame.prototype.getBoard = function(){
  return this.board;
}

DraughtGame.prototype.getReplayBoard = function(){
  return this.replayBoard;
}

DraughtGame.prototype.picked = function (id){
  let move = null;

  if(id == this.whitesDrawID){
    this.whites.toggleDraw();
    return;
  }
  if(id == this.blacksDrawID){
    this.blacks.toggleDraw();
    return;
  }

  if (id < this.IDGamma[0] || id > this.IDGamma[1]){
    return;
  }

  if (this.gameState != GAMESTATE.RUNNING){
    return;
  }

  switch(this.turn){
    case TURN.WHITES:{
      if(this.whites instanceof Player){
        move = this.whites.createMove(id, this.board);
      }
    }
    break;
    case TURN.BLACKS:{
      if(this.blacks instanceof Player){
        move = this.blacks.createMove(id, this.board);
      }
    }
    break;
    default:
    break;
  }

  //if valid move
  if (move != null && DraughtAux.checkValidMove(move, this.board)){
    this.forceConsecutiveMoves(move);
    this.standByMove = move;
  }
}

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


DraughtGame.prototype.nextTurn = function(){
  if(this.changeTurn){
    switch(this.turn){
      case (TURN.BLACKS):{
        this.turn = TURN.WHITES;
      }
      break;
      case (TURN.WHITES):{
        this.turn = TURN.BLACKS;
      }
      break;
      default:
      break;
    }
  }
  else{
    this.changeTurn = true;
  }
}

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

DraughtGame.prototype.update = function(deltaTime){
  let move = null, animation = null;
  //deltaTime is in ms

  switch(this.gameState){
    case (GAMESTATE.RUNNING):{
      if(this.standByMove != null){
        this.nextTurn();
        this.gameState = GAMESTATE.ANIMATION;
      }
      if(this.turn == TURN.WHITES && DraughtAux.hasWon(this.board, this.turn)){
        this.whites.won();
        this.gameState = GAMESTATE.GAME_FINISHED;
      }
      else if(this.turn == TURN.BLACKS && DraughtAux.hasWon(this.board, this.turn)){
        this.blacks.won();
        this.gameState = GAMESTATE.GAME_FINISHED;
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
    }
    break;
    default:
    break;
  }

  if (this.gameState == GAMESTATE.RUNNING){
    switch(this.turn){
      case TURN.WHITES:{
        if(this.whites instanceof Computer && !this.whites.getCreatingMove()){
          move = this.whites.createMove(this.board);
        }
      }
      break;
      case TURN.BLACKS:{
        if(this.blacks instanceof Computer && !this.blacks.getCreatingMove()){
          move = this.blacks.createMove(this.board);
        }
      }
      break;
      default:
      break;
    }
  }

  if(move != null){
    this.forceConsecutiveMoves(move);
    this.standByMove = move;
  }
}

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

  //Scoreboard
  this.time[0].innerHTML = '00:00';
  this.turnTimes[0].setAttribute("style","");
  this.turnTimes[0].innerHTML = '';
  this.turnTimes[1].setAttribute("style","");
  this.turnTimes[1].innerHTML = '';
  this.startTime = null;

  let blacks = '<span class="timeTurn" id="time1"></span><img src="scenes/images/black_checker.jpg"/>';
  let whites = '<span class="timeTurn" id="time2"></span><img src="scenes/images/white_checker.jpg"/>';

  if(this.blacksOwner == OWNER.HUMAN){
    blacks += 'Player 1';
  }
  else {
    blacks += 'CPU';
  }

  if(this.whitesOwner == OWNER.HUMAN){
    whites += 'Player 2';
  }
  else {
    whites += 'CPU';
  }

  this.players[0].innerHTML = blacks;
  this.players[1].innerHTML = whites;
}

DraughtGame.prototype.replayGame = function(){
  if(this.moves.length > 0){
    this.moveReplayIndex = 0;
    this.replayBoard.resetMap();
    this.gameState = GAMESTATE.REPLAY;
  }
}

DraughtGame.prototype.setStartTime = function(currTime){
  this.startTime = currTime;
  this.turnTime = currTime;
}

DraughtGame.prototype.displayTime = function(currTime){
  this.currentTime = currTime;
  this.timeElapsed = (currTime - this.startTime)/1000;
  let minutes = ("0" + parseInt(this.timeElapsed/60)).slice(-2);
  let seconds = ("0" + parseInt(this.timeElapsed%60)).slice(-2);
  this.time[0].innerHTML = minutes +':'+seconds;
}

DraughtGame.prototype.displayTurnTime = function(currTime){
  let time;
  time = (currTime - this.turnTime)/1000;

  let minutes = ("0" + parseInt(time/60)).slice(-2);
  let seconds = ("0" + parseInt(time%60)).slice(-2);

  switch(this.gameState){
    case (GAMESTATE.BLACKS_TURN):{
      this.turnTimes[0].innerHTML = minutes +':'+seconds;
    }
    break;
    case (GAMESTATE.WHITES_TURN):{
      this.turnTimes[1].innerHTML = minutes +':'+seconds;
    }
    break;
    default:
    break;
  }
}

DraughtGame.prototype.setTurnTime = function(){
  switch(this.gameState){
    case (GAMESTATE.BLACKS_TURN):{
      this.turnTimes[1].setAttribute("style","");
      this.turnTimes[1].innerHTML = '00:00';
      this.turnTimes[0].innerHTML = '00:00';
      this.turnTimes[0].setAttribute("style","color:yellow;");
    }
    break;
    case (GAMESTATE.WHITES_TURN):{
      this.turnTimes[0].setAttribute("style","");
      this.turnTimes[0].innerHTML = '00:00';
      this.turnTimes[1].innerHTML = '00:00';
      this.turnTimes[1].setAttribute("style","color:yellow;");
    }
    break;
    default:
    break;
  }
  this.turnTime = this.currentTime;
}

DraughtGame.prototype.showInstructions = function(){
  let info = document.getElementById("gameInstructions");
  info.style.display = "block";
}

DraughtGame.prototype.closeInstructions = function(){
  let info = document.getElementById("gameInstructions");
  info.style.display = "none";
}

window.onclick = function(event) {
  let info = document.getElementById("gameInstructions");
    if (event.target == info) {
        info.style.display = "none";
    }
}
