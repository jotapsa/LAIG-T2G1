POINTS ={
  WON: 10000000000,
  KING: 50000,
  PIECE: 30000,
  POSITION_MULTIPLIER: 100,
}

/**
 * Computer
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Computer(piece, depth){
  //construtor
  this.piece = piece;
  this.depth= depth;
  this.creatingMove = false;
  this.wins = 0;

  this.selectedPiece = false;
  this.selectLOCK = false;
  this.startingPos = null;
  this.finalPos = null;
};

Computer.prototype.getWins = function(){
  return this.wins;
}

Computer.prototype.getCreatingMove = function(){
  return this.creatingMove;
}

Computer.prototype.getselectLOCK = function(){
  return this.selectLOCK;
}

/*
* This function will always return null if called on Computer
*/
Computer.prototype.getSelectedPiecePos = function(){
  if(this.selectedPiece){
    return this.startingPos;
  }
  return null;
}

Computer.prototype.createMove = function(board){
  this.creatingMove = true;
  let move = null;

  move = Computer.alphaBeta(board, this.depth, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.piece)[1];

  this.creatingMove = false;
  return move;
}

/*
*Implementation of the Alpha-beta Pruning Algorithm, we set whites as the maximizing player and blacks as the minimizer
*
*alpha = best already explored option along path to the root for maximizer
*beta = best already explored option along path to the root for minimizer
*
* returns an array with the value of the board for the last move, and the last move
*/

Computer.alphaBeta = function(board, depth, alpha, beta, player){
  let bestMove = null;

  if(!Computer.canExploreFurther(depth)){
    return [Computer.evaluateBoard(board), bestMove];
  }

  let possibleMoves, possibleBoards, value, childValue;

  possibleMoves = DraughtAux.getAllPossibleMovesForPlayer(player, board);
  possibleBoards = DraughtAux.simulatePossibleBoards(board, possibleMoves);

  if(player == "Whites"){
    value = -Number.MAX_SAFE_INTEGER;
    for(let i=0; i<possibleBoards.length; i++){
      childValue = Computer.alphaBeta(possibleBoards[i], depth-1, alpha, beta, "Blacks")[0];
      if (value <= childValue){
        value = childValue;
        bestMove = possibleMoves[i];
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
      childValue = Computer.alphaBeta(possibleBoards[i], depth-1 , alpha, beta, "Whites")[0];
      if (value >= childValue){
        value = childValue;
        bestMove = possibleMoves[i];
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
Computer.evaluateBoard = function(board){
  let value = 0;

  value += Computer.evaluateNumberOfPieces(board);
  value += Computer.evaluatePiecesPosition(board);
  value += Computer.generateRandomComponent();

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
