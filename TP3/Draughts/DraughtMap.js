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
function DraughtMap(map , capturedWhitePieces, capturedWhiteKings, capturedBlackPieces, capturedBlackKings){
  //construtor
  this.capturedWhitePieces = capturedWhitePieces || 0;
  this.capturedWhiteKings = capturedWhiteKings || 0;
  this.capturedBlackPieces = capturedBlackPieces || 0;
  this.capturedBlackKings = capturedBlackKings || 0;

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

  this.countPieces();
};

DraughtMap.prototype.getsizeN = function(){
  return this.sizeN;
}

DraughtMap.prototype.getPos = function (y, x){
  return this.map[y][x];
}

DraughtMap.prototype.countPieces = function(){
  this.blackPieces = 0;
  this.blackKings = 0;
  this.whitePieces = 0;
  this.whiteKings = 0;

  for(let y=0; y<this.sizeN; y++){
    for(let x=0; x<this.sizeN; x++){
      switch(this.map[y][x]){
        case (CELL.WHITE_PIECE):{
          this.whitePieces++;
        }
        break;
        case (CELL.WHITE_KING):{
          this.whiteKings++;
        }
        break;
        case (CELL.BLACK_PIECE):{
          this.blackPieces++;
        }
        break;
        case (CELL.BLACK_KING):{
          this.blackKings++;
        }
        break;
        default:
        break;
      }
    }
  }
}

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

  //Captured Piece
  switch(this.map[intermediatePos[0]][intermediatePos[1]]){
    case CELL.BLACK_KING:{
      this.capturedBlackKings++;
      this.blackKings--;
    }
    break;
    case CELL.BLACK_PIECE:{
      this.capturedBlackPieces++;
      this.blackPieces--;
    }
    break;
    case CELL.WHITE_KING:{
      this.capturedWhiteKings++;
      this.whiteKings--;
    }
    break;
    case CELL.WHITE_PIECE:{
      this.capturedWhitePieces++;
      this.whitePieces--;
    }
    break;
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

  //Captured Piece
  switch(capturedPiece){
    case CELL.BLACK_KING:{
      this.capturedBlackKings--;
      this.blackKings++;
    }
    break;
    case CELL.BLACK_PIECE:{
      this.capturedBlackPieces--;
      this.blackPieces++;
    }
    break;
    case CELL.WHITE_KING:{
      this.capturedWhiteKings--;
      this.whiteKings++;
    }
    break;
    case CELL.WHITE_PIECE:{
      this.capturedWhitePieces--;
      this.whitePieces++;
    }
    break;
    default:
    break;
  }

  this.map[intermediatePos[0]][intermediatePos[1]] = capturedPiece;
}

DraughtMap.prototype.resetCapturedPieces = function(){
  this.capturedWhitePieces = 0;
  this.capturedWhiteKings = 0;
  this.capturedBlackPieces = 0;
  this.capturedBlackKings = 0;
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
  this.resetCapturedPieces()
  this.countPieces();
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

  return new DraughtMap(mapClone, this.capturedWhitePieces, this.capturedWhiteKings, this.capturedBlackPieces, this.capturedBlackKings);
}
