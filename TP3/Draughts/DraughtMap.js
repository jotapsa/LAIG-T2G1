CELL = {
  INVALID_SQUARE : -1,
  EMPTY_SQUARE : 0,
  WHITE_PIECE : 1,
  WHITE_KING :2,
  BLACK_PIECE : 3,
  BLACK_KING: 4,
};

/**
 * DraughtMap
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtMap(map){
  //construtor
  this.map = map || [
    [CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE],
    [CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE],
    [CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE],
    [CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE],
  ];

  this.sizeN = this.map.length;
};

DraughtMap.prototype.makeMove = function(move){
  let startingPos, finalPos;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();

  if(Math.abs(finalPos[0]-startingPos[0]) == 2 && Math.abs(finalPos[1]-startingPos[1]) == 2){
    this.capturePiece(move);
  }

  this.map[finalPos[0]][finalPos[1]] = this.map[startingPos[0]][startingPos[1]];
  this.map[startingPos[0]][startingPos[1]] = CELL.EMPTY_SQUARE;

  //Should we also promote it ?
  if(finalPos[0] == 0 && this.map[finalPos[0]][finalPos[1]] == CELL.BLACK_PIECE){
    move.setPromotedPiece(true);
    this.map[finalPos[0]][finalPos[1]] = CELL.BLACK_KING;
  }
  else if(finalPos[0] == (this.sizeN-1) && this.map[finalPos[0]][finalPos[1]] == CELL.WHITE_PIECE){
    move.setPromotedPiece(true);
    this.map[finalPos[0]][finalPos[1]] = CELL.WHITE_KING;
  }
}

DraughtMap.prototype.capturePiece = function(move){
  let startingPos, intermediatePos, finalPos;
  let delta;
  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();

  delta = [finalPos[0]-startingPos[0], finalPos[1]-startingPos[1]];
  intermediatePos = [startingPos[0] + delta[0]/2, startingPos[1] + delta[1]/2];

  switch(this.map[startingPos[0]][startingPos[1]]){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      //maybe whitepieces--; ?
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      //maybe blackpieces--; ?
    }
    default:
    break;
  }

  move.setCapturedPiece(this.map[intermediatePos[0]][intermediatePos[1]]);
  this.map[intermediatePos[0]][intermediatePos[1]] = CELL.EMPTY_SQUARE;
}

DraughtMap.prototype.undoMove = function(move){
  let startingPos, finalPos;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();

  //Should we demote it ?
  if(move.getPromotedPiece() && this.map[finalPos[0]][finalPos[1]] == CELL.WHITE_KING){
    this.map[finalPos[0]][finalPos[1]] = CELL.WHITE_PIECE;
  }
  else if(move.getPromotedPiece() && this.map[finalPos[0]][finalPos[1]] == CELL.BLACK_KING){
    this.map[finalPos[0]][finalPos[1]] = CELL.BLACK_PIECE;
  }

  if(Math.abs(finalPos[0]-startingPos[0]) == 2 && Math.abs(finalPos[1]-startingPos[1]) == 2){
    this.releasePiece(move);
  }

  this.map[startingPos[0]][startingPos[1]] = this.map[finalPos[0]][finalPos[1]];
  this.map[finalPos[0]][finalPos[1]] = CELL.EMPTY_SQUARE;
}

DraughtMap.prototype.releasePiece = function(move){
  let startingPos, intermediatePos, finalPos, capturedPiece;
  let delta;
  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();
  capturedPiece = move.getCapturedPiece();

  delta = [finalPos[0]-startingPos[0], finalPos[1]-startingPos[1]];
  intermediatePos = [startingPos[0] + delta[0]/2, startingPos[1] + delta[1]/2];

  switch(this.map[finalPos[0]][finalPos[1]]){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      //maybe whitepieces++; ?
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      //maybe blackpieces++; ?
    }
    default:
    break;
  }

  this.map[intermediatePos[0]][intermediatePos[1]] = capturedPiece;
}

DraughtMap.prototype.resetMap = function(){
  this.map =[
    [CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE],
    [CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE, CELL.WHITE_PIECE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE],
    [CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE, CELL.EMPTY_SQUARE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE],
    [CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE],
    [CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE, CELL.INVALID_SQUARE, CELL.BLACK_PIECE],
  ];
}

DraughtMap.prototype.getsizeN = function(){
  return this.sizeN;
}

DraughtMap.prototype.getPos = function (y, x){
  return this.map[y][x];
}

/**
* Creates a new DraughtMap from the current parameters.
* @return {DraughtMap} A DraughtMap that is a clone of this one.
*/
DraughtMap.prototype.clone = function (){
  let mapClone = [];
  for(let i=0; i< this.map.length; i++){
    mapClone.push(this.map[i].slice(0));
  }

  return new DraughtMap(mapClone);
}
