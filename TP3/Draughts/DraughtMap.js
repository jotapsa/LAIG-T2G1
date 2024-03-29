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
function DraughtMap(map , capturedWhites, capturedBlacks, movesN){
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

  this.capturedWhites = capturedWhites || [];
  this.capturedBlacks = capturedBlacks || [];

  this.movesForDraw = 20;
  this.movesN = movesN || 0;

  //set when countPieces() method is called because we can receive a modified map
  this.blackPieces;
  this.whitePieces;

  this.countPieces();
};

/**
* Return DraughtMap blackPieces.
*/
DraughtMap.prototype.getblackPieces = function(){
  return this.blackPieces;
}

/**
* Return DraughtMap whitePieces.
*/
DraughtMap.prototype.getwhitePieces = function(){
  return this.whitePieces;
}

/**
* Return DraughtMap sizeN.
*/
DraughtMap.prototype.getsizeN = function(){
  return this.sizeN;
}

/**
* Return DraughtMap position.
* @param {number} y
* @param {number} x
*/
DraughtMap.prototype.getPos = function (y, x){
  return this.map[y][x];
}

/**
* Return DraughtMap capturedWhites or capturedBlacks.
* @param {string} type
*/
DraughtMap.prototype.getCapturedArray = function(type){
  switch(type){
    case ("white"):{
      return this.capturedWhites;
    }
    break;
    case ("black"):{
      return this.capturedBlacks;
    }
    break;
    default:
    break;
  }
  return [];
}

/**
* Count DraughtMap pieces.
*/
DraughtMap.prototype.countPieces = function(){
  this.blackPieces = 0;
  this.whitePieces = 0;

  for(let y=0; y<this.sizeN; y++){
    for(let x=0; x<this.sizeN; x++){
      switch(this.map[y][x]){
        case (CELL.WHITE_KING):
        case (CELL.WHITE_PIECE):{
          this.whitePieces++;
        }
        break;
        case (CELL.BLACK_KING):
        case (CELL.BLACK_PIECE):{
          this.blackPieces++;
        }
        break;
        default:
        break;
      }
    }
  }
}

/**
* Make Move on DraughtMap.
* @param {Move} move
*/
DraughtMap.prototype.makeMove = function(move){
  let startingPos, finalPos, cell;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();
  cell = this.map[startingPos[0]][startingPos[1]];

  if(Math.abs(finalPos[0]-startingPos[0]) == 2 && Math.abs(finalPos[1]-startingPos[1]) == 2){
    this.capturePiece(move);
  }

  move.setMovesN(this.movesN);
  if(move.getCapturedPiece() != CELL.EMPTY_SQUARE || cell == CELL.BLACK_PIECE || cell == CELL.WHITE_PIECE){
    this.resetMovesN();
  }
  else{
    this.movesN++;
  }

  this.map[finalPos[0]][finalPos[1]] = cell;
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

/**
* Capture Piece on Move in DraughtMap.
* @param {Move} move
*/
DraughtMap.prototype.capturePiece = function(move){
  let startingPos, intermediatePos, finalPos, cell;
  let delta;
  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();

  delta = [finalPos[0]-startingPos[0], finalPos[1]-startingPos[1]];
  intermediatePos = [startingPos[0] + delta[0]/2, startingPos[1] + delta[1]/2];
  cell = this.map[intermediatePos[0]][intermediatePos[1]];

  //Captured Piece
  switch(cell){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      this.capturedBlacks.push(cell);
      this.blackPieces--;
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      this.capturedWhites.push(cell);
      this.whitePieces--;
    }
    break;
    default:
    break;
  }

  move.setCapturedPiece(cell);
  this.map[intermediatePos[0]][intermediatePos[1]] = CELL.EMPTY_SQUARE;
}

/**
* Return if Game has draw.
*/
DraughtMap.prototype.isDraw = function (){
  if(this.movesN >= this.movesForDraw){
    this.resetMovesN();
    return true;
  }
  return false;
}

/**
* Undo Move in DraughtMap.
* @param {Move} move
*/
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

  this.movesN = move.getMovesN();

  this.map[startingPos[0]][startingPos[1]] = this.map[finalPos[0]][finalPos[1]];
  this.map[finalPos[0]][finalPos[1]] = CELL.EMPTY_SQUARE;
}

/**
* Release piece on Move in DraughtMap.
* @param {Move} move
*/
DraughtMap.prototype.releasePiece = function(move){
  let startingPos, intermediatePos, finalPos, cell;
  let delta;
  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();
  cell = move.getCapturedPiece();

  delta = [finalPos[0]-startingPos[0], finalPos[1]-startingPos[1]];
  intermediatePos = [startingPos[0] + delta[0]/2, startingPos[1] + delta[1]/2];

  //Release Piece -- this assumes the last piece
  //captured is also the last one in the array
  switch(cell){
    case CELL.BLACK_PIECE:
    case CELL.BLACK_KING:{
      this.capturedBlacks.pop();
      this.blackPieces++;
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      this.capturedWhites.pop();
      this.whitePieces++;
    }
    break;
    default:
    break;
  }

  this.map[intermediatePos[0]][intermediatePos[1]] = cell;
}

/**
* Reset DraughtMap map.
*/
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
* Reset DraughtMap captured pieces.
*/
DraughtMap.prototype.resetCapturedPieces = function(){
  this.capturedWhites = [];
  this.capturedBlacks = [];
}

/**
* Reset DraughtMap movesN.
*/
DraughtMap.prototype.resetMovesN = function(){
  this.movesN = 0;
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

  return new DraughtMap(mapClone, this.capturedWhites.slice(0), this.capturedBlacks.slice(0), this.movesN);
}
