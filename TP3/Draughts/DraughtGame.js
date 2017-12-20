GAMESTATE = {
  WHITES_TURN: 0,
  WHITES_SELECTED: 1,
  BLACKS_TURN: 2,
  BLACKS_SELECTED: 3,
  GAME_FINISHED: 4,
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
  this.moves = [];
  this.gameState = GAMESTATE.BLACKS_TURN;

  this.board = new DraughtMap();
};

DraughtGame.prototype.picked = function (id){
  let y = Math.floor(id / 8);
  let x = id % 8;
  console.log ("Y: " + y + " X: " + x);

  switch (this.gameState){
    case GAMESTATE.WHITES_TURN:
    {

    }
    break;
    case GAMESTATE.BLACKS_TURN:
    {

    }
    break;
    case GAMESTATE.GAME_FINISHED:
    break;
    default:
    break;
  }
}

DraughtGame.prototype.getPos = function(y, x){
  return this.board.getPos(y,x);
}

DraughtGame.prototype.getsizeN = function(){
  return this.board.getsizeN();
}
