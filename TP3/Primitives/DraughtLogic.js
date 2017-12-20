var invalidSquare = -1;
var emptySquare = 0;
var whitePiece = 1;
var blackPiece = 2;

/**
 * DraughtLogic
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtLogic(){
  //construtor
  this.map =[
    [whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare],
    [invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece],
    [whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare],
    [invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare],
    [emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare],
    [invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece],
    [blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare],
    [invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece],
  ];
  
  this.sizeN = this.map.length;
};

DraughtLogic.prototype.resetMap = function (){
  this.map =[
    [whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare],
    [invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece],
    [whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare, whitePiece, invalidSquare],
    [invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare],
    [emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare, emptySquare, invalidSquare],
    [invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece],
    [blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare],
    [invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece, invalidSquare, blackPiece],
  ];
}

DraughtLogic.prototype.getsizeN = function(){
  return this.sizeN;
}

DraughtLogic.prototype.getPos = function (y, x){
  return this.map[y][x];
}
