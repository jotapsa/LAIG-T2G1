POINTS ={
  WON: 10000000000,
  KING: 50000,
  PIECE: 30000,
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

  this.selectLOCK = false;
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

Computer.prototype.createMove = function(board){
  this.creatingMove = true;
  let move = null;

  Computer.alphaBeta(board, this.depth, Number.MIN_VALUE, Number.MAX_VALUE, this.piece);

  this.creatingMove = false;
  return move;
}

/*
*Implementation of the Alpha-beta Pruning Algorithm, we set whites as the maximizing player and blacks as the minimizer
*
*alpha = best already explored option along path to the root for maximizer
*beta = best alread explored option along path to the root for minimizer
*
*/

Computer.alphaBeta = function(board, depth, alpha, beta, player){
  if(!Computer.canExploreFurther(depth)){
    return Computer.evaluateBoard(board);
  }

  let possibleMoves, possibleBoards, v;

  possibleMoves = DraughtAux.getAllPossibleMovesForPlayer(player, board);
  possibleBoards = DraughtAux.simulatePossibleBoards(board, possibleMoves);

  if(player == "Whites"){
    v = Number.MIN_VALUE;
    for(let i=0; i<possibleBoards.length; i++){
      v = Math.max(v, Computer.alphaBeta(possibleBoards[i], depth-1, alpha, beta, "Blacks"));
      alpha = Math.max(alpha, v);
      if(beta <= alpha){
        break;
      }
    }
    return v;
  }
  else{
    v = Number.MAX_VALUE;
    for(let i=0; i<possibleBoards.length; i++){
      v = Math.min(v, Computer.alphaBeta(possibleBoards[i], depth-1 , alpha, beta, "Whites"));
      beta = Math.min(beta, v);
      if(beta <= alpha){
        break;
      }
    }
    return v;
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
  //value += Computer.evaluatePiecesCloserToBeingKings(board);
  //value += Computer.evaluetePiecesPosition(board);
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


Computer.generateRandomComponent = function(){
  let positive = Math.random() >= 0.5;
  if(positive){
    return Math.floor(Math.random() * 10);
  }

  return -Math.floor(Math.random() * 10);
}
