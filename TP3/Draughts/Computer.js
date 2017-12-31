POINTS ={
  WON: 10000000000,
  DRAW: 0,
  KING: 50000,
  PIECE: 30000,
  POSITION_MULTIPLIER: 100,
}

/**
 * Computer
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Computer(piece, depth,computer){
  //construtor
  if (computer===undefined){
    this.piece = piece;
    this.depth= depth;
    this.creatingMove = false;
    this.wins = 0;

    this.startingPos = null;

    this.draw = false;
  }
  else {
    this.piece = computer['piece'];
    this.depth = computer['depth'];
    this.creatingMove = computer['creatingMove'];
    this.wins = computer['wins'];

    this.startingPos = computer['startingPos'];

    this.draw = computer['draw'];
  }
};

/**
* Return number of Computer wins.
*/
Computer.prototype.getWins = function(){
  return this.wins;
}

/**
* Return if Computer creatingMove.
*/
Computer.prototype.getCreatingMove = function(){
  return this.creatingMove;
}

/**
* Return if Computer wants to draw Game.
*/
Computer.prototype.wantsDraw = function(){
  return this.draw;
}

/**
* Increments Computer wins.
*/
Computer.prototype.won = function(){
  this.wins++;
}

/**
* Toggle Computer draw boolean.
*/
Computer.prototype.toggleDraw = function(){
  return;
}

/*
* Return Computer selected Piece.
* This function will always return null if called on Computer.
*/
Computer.prototype.getSelectedPiecePos = function(){
  return null;
}

/**
* Create Move to Computer.
* @param {DraughtMap} board
*/
Computer.prototype.createMove = function(board){
  let move = null;
  if(this.creatingMove){
    return null;
  }

  this.creatingMove = true;
  move = Computer.alphaBeta(board, this.depth, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.piece, this.startingPos)[1];
  this.creatingMove = false;

  return move;
}

/**
* Force Computer to consecutive Move.
*/
Computer.prototype.forceConsecutiveMove = function(startingPos){
  this.startingPos = startingPos;
}

/**
* Toggle Computer select Lock.
*/
Computer.prototype.toggleOFFselectLOCK = function(){
  this.startingPos = null;
}

/*
*Implementation of the Alpha-beta Pruning Algorithm, we set whites as the maximizing player and blacks as the minimizer
*
*alpha = best already explored option along path to the root for maximizer
*beta = best already explored option along path to the root for minimizer
*
* returns an array with the value of the board for the last move, and the last move
*/

Computer.alphaBeta = function(board, depth, alpha, beta, player, startingPos){
  let bestMove = null;

  if(!Computer.canExploreFurther(depth)){
    return [Computer.evaluateBoard(board, player), bestMove];
  }

  let possibleMoves, possibleBoards, value, childValue;

  if(startingPos != null){
    let playerCell = board.getPos(startingPos[0], startingPos[1]);
    possibleMoves = DraughtAux.ObtainForcedMovesForPiece(startingPos, board, playerCell);
  }
  else{
    possibleMoves = DraughtAux.getAllPossibleMovesForPlayer(player, board);
  }
  possibleBoards = DraughtAux.simulatePossibleBoards(board, possibleMoves);

  if(player == "Whites"){
    value = -Number.MAX_SAFE_INTEGER;
    for(let i=0; i<possibleBoards.length; i++){
      childValue = Computer.alphaBeta(possibleBoards[i][0], depth-1, alpha, beta, "Blacks")[0];
      if (value <= childValue){
        value = childValue;
        bestMove = possibleBoards[i][1];
      }
      alpha = Math.max(alpha, value);
      if(beta <= alpha){
        break;
      }
    }
    return [value, bestMove];
  }
  else{
    value = Number.MAX_SAFE_INTEGER;
    for(let i=0; i<possibleBoards.length; i++){
      childValue = Computer.alphaBeta(possibleBoards[i][0], depth-1 , alpha, beta, "Whites")[0];
      if (value >= childValue){
        value = childValue;
        bestMove = possibleBoards[i][1];
      }
      beta = Math.min(beta, value);
      if(beta <= alpha){
        break;
      }
    }
    return [value, bestMove];
  }
}

Computer.canExploreFurther = function(depth){
  //is game over ?
  //draw?

  if (depth == 0){
    return false;
  }

  return true;
}

/*
* Heuristic to evaluate a board Position
*
*/
Computer.evaluateBoard = function(board, player){
  let value = 0;

  value += Computer.evaluateNumberOfPieces(board);
  value += Computer.evaluatePiecesPosition(board);
  value += Computer.generateRandomComponent();
  value += Computer.evaluateIfGameIsOver(board, player);
  if (board.isDraw()){
    value = POINTS.DRAW;
  }

  return value;
}

Computer.evaluateNumberOfPieces = function(board){
  let value = 0, sizeN;

  sizeN = board.getsizeN();
  for(let y=0; y<sizeN; y++){
    for(let x=0; x<sizeN; x++){
      switch(board.getPos(y, x)){
        case(CELL.WHITE_PIECE):
          value += POINTS.PIECE;
        break;
        case(CELL.WHITE_KING):
          value += POINTS.KING;
        break;
        case(CELL.BLACK_PIECE):
          value -= POINTS.PIECE;
        break;
        case(CELL.BLACK_KING):
          value -= POINTS.KING;
        break;
        default:
        break;
      }
    }
  }

  return value;
}

Computer.evaluatePiecesPosition = function(board){
  let value = 0, sizeN;

  sizeN = board.getsizeN();
  for(let y=0; y<sizeN; y++){
    for(let x=0; x<sizeN; x++){
      switch(board.getPos(y, x)){
        case(CELL.WHITE_PIECE):
          value += y*POINTS.POSITION_MULTIPLIER;
        break;
        case(CELL.BLACK_PIECE):
          value -= (sizeN-y-1)*POINTS.POSITION_MULTIPLIER;
        break;
        default:
        break;
      }
    }
  }

  return value;
}

Computer.generateRandomComponent = function(){
  let positive = Math.random() >= 0.5;
  if(positive){
    return Math.floor(Math.random() * 10);
  }

  return -Math.floor(Math.random() * 10);
}

Computer.evaluateIfGameIsOver = function(board, player){
  let winner = null;
  if(player == "Whites"){
    winner = DraughtAux.isGameOver(board, TURN.WHITES);
  }
  else if(player == "Blacks"){
    winner = DraughtAux.isGameOver(board, TURN.BLACKS);
  }

  if(winner != null && winner == TURN.BLACKS){
    return -POINTS.WON;
  }
  else if(winner != null && winner == TURN.WHITES){
    return POINTS.WON;
  }
  return 0;
}
