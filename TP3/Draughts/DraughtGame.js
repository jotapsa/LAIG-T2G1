GAMESTATE = {
  RUNNING: 1,
  ANIMATION: 2,
  GAME_FINISHED: 3,
  REPLAY: 4,
};

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
function DraughtGame(){
  //construtor
  this.moves = [];
  this.standByMove = null;
  this.whitesOwner = OWNER.HUMAN;
  this.blacksOwner = OWNER.HUMAN;
  this.gameState = GAMESTATE.RUNNING;
  this.turn = TURN.BLACKS;
  this.depth = 5;
  this.started = false;

  this.board = new DraughtMap();
  this.IDGamma = [0, Math.pow(this.board.getsizeN(), 2) -1];

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

  this.players = document.getElementsByClassName("player");
  this.turnTimes = document.getElementsByClassName("timeTurn");
  this.score = document.getElementsByClassName("score");
  this.time = document.getElementsByClassName("time");
};

DraughtGame.prototype.getgameState = function(){
  return this.gameState;
}

DraughtGame.prototype.getTurn = function (){
  return this.turn;
}

DraughtGame.prototype.picked = function (id){
  let move = null;

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
  if (move && DraughtAux.checkValidMove(this, move, this.board)){
    if(!this.whites.getselectLOCK() && !this.blacks.getselectLOCK()){
      this.nextTurn();
    }
    //animation

    this.standByMove = move;
    this.gameState = GAMESTATE.ANIMATION;
  }
}

DraughtGame.prototype.nextTurn = function(){
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

DraughtGame.prototype.undoMove = function(){
  //If we have made a move
  if(this.moves.length){
    let move;
    move = this.moves.pop();
    this.board.undoMove(move);
    this.turn = move.getTurn();
  }
}

DraughtGame.prototype.update = function(deltaTime){
  let move = null, animation = null;
  //deltaTime is in ms

  switch(this.gameState){
    case (GAMESTATE.RUNNING):{
      if(this.standByMove != null){
        this.moves.push(this.standByMove);
        this.board.makeMove(this.standByMove);
        this.standByMove = null;
      }
    }
    break;
    case (GAMESTATE.ANIMATION):{
      animation = this.standByMove.getAnimation();
      if(animation.isDone()){
        this.gameState = GAMESTATE.RUNNING;
      }
      animation.update(deltaTime);
    }
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

  if(move){
    let startingPos = move.getStartingPos();
    let finalPos =  move.getFinalPos();
    let playerCell = this.board.getPos(startingPos[0], startingPos[1]);


    if(move.isforcedMove()){
      let furtherForcedMoves = DraughtAux.ObtainForcedMovesForPiece(finalPos, this.board, playerCell);
      switch (playerCell) {
        case CELL.WHITE_PIECE:
        case CELL.WHITE_KING:{
          if(furtherForcedMoves.length>0){
            this.whites.forceConsecutiveMove(finalPos);
          }
          else{
            this.whites.toggleOFFselectLOCK(finalPos);
          }
        }
        break;
        case CELL.BLACK_PIECE:
        case CELL.BLACK_KING:{
          if(furtherForcedMoves.length>0){
            this.blacks.forceConsecutiveMove(finalPos);
          }
          else{
            this.blacks.toggleOFFselectLOCK(finalPos);
          }
        }
        break;
        default:
        break;
      }
    }
    if(!this.whites.getselectLOCK() && !this.blacks.getselectLOCK()){
      this.nextTurn();
    }
    this.standByMove = move;
    this.gameState = GAMESTATE.ANIMATION;
  }
}

DraughtGame.prototype.resetGame = function(){
  this.moves = [];
  this.gameState = GAMESTATE.RUNNING;
  this.turn = TURN.BLACKS;
  this.started = false;

  this.board.resetMap();

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

DraughtGame.prototype.setStartTime = function(currTime){
  this.startTime = currTime;
  this.turnTime = currTime;
}

DraughtGame.prototype.displayTime = function(currTime){
  this.currentTime = currTime;
  let time = (currTime - this.startTime)/1000;
  let minutes = ("0" + parseInt(time/60)).slice(-2);
  let seconds = ("0" + parseInt(time%60)).slice(-2);
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
