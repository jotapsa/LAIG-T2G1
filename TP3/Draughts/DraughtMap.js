var invalidSquare = -1;
var emptySquare = 0;
var whitePiece = 1;
var blackPiece = 2;

/**
 * DraughtMap
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtMap(){
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

DraughtMap.prototype.resetMap = function (){
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

DraughtMap.prototype.getsizeN = function(){
  return this.sizeN;
}

DraughtMap.prototype.getPos = function (y, x){
  return this.map[y][x];
}
