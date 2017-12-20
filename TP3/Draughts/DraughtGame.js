GAMESTATE = {
};

GAMEMODE = {
    HUMAN_VS_HUMAN: 0,
    HUMAN_VS_CPU: 1,
    CPU_VS_CPU: 2
};

THEME = {
    NORMAL: 0,
    LEGACY: 1,
};

/**
 * DraughtGame
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtGame(){
  //construtor
  this.board = new DraughtMap();
};

DraughtGame.prototype.makeMove = function(move){
  console.log(move.getStartingPos);
  console.log(move.getFinalPos);
}

DraughtGame.prototype.getPos = function(y, x){
  return this.board.getPos(y,x);
}

DraughtGame.prototype.getsizeN = function(){
  return this.board.getsizeN();
}
