/**
 * Player
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Player(piece,player){
  //construtor
  if (player===undefined){
    this.pieces = piece;
    this.wins = 0;

    this.selectedPiece = false;
    this.selectLOCK = false;
    this.startingPos = null;
    this.finalPos = null;

    this.draw = false;
  }
  else {
    this.pieces = player['pieces'];
    this.wins = player['wins'];

    this.selectedPiece = player['selectedPiece'];
    this.selectLOCK = player['selectLOCK'];
    this.startingPos = player['startingPos'];
    this.finalPos = player['finalPos'];

    this.draw = player['draw'];
  }
};

Player.prototype.getWins = function(){
  return this.wins;
}

Player.prototype.wantsDraw = function(){
  return this.draw;
}

Player.prototype.won = function(){
  this.wins++;
}

Player.prototype.toggleDraw = function(){
  this.draw = !this.draw;
}

Player.prototype.createMove = function(id, board){
  let move=null; //reset move everytime
  let y, x;

  y = Math.floor(id / 8);
  x = id % 8;
  console.log("Y: " + y + " X: " + x);
  console.log(this.pieces + " selectLOCK: " + this.selectLOCK);

  switch (this.pieces) {
    case "Whites":{
      if((board.getPos(y,x) == CELL.WHITE_PIECE || board.getPos(y,x) == CELL.WHITE_KING) && !this.selectLOCK){
        this.startingPos = [y, x];
        this.selectedPiece = true;
      }
      else if (this.selectedPiece && board.getPos(y,x) == CELL.EMPTY_SQUARE){
        this.finalPos = [y, x];
        if(!this.selectLOCK){
          this.selectedPiece = false;
        }
        move = new Move(this.startingPos, this.finalPos, TURN.WHITES);
      }
    }
    break;
    case "Blacks":{
      if((board.getPos(y,x) == CELL.BLACK_PIECE || board.getPos(y,x) == CELL.BLACK_KING) && !this.selectLOCK){
        this.startingPos = [y, x];
        this.selectedPiece = true;
      }
      else if (this.selectedPiece && board.getPos(y,x) == CELL.EMPTY_SQUARE){
        this.finalPos = [y, x];
        if(!this.selectLOCK){
          this.selectedPiece = false;
        }
        move = new Move(this.startingPos, this.finalPos, TURN.BLACKS);
      }
    }
    break;
    default:
    break;

  }
  return move;
}

Player.prototype.forceConsecutiveMove = function(startingPos){
  this.startingPos = startingPos;
  this.selectedPiece = true;
  this.selectLOCK = true;
}


Player.prototype.toggleOFFselectLOCK = function(){
  this.selectLOCK = false;
}

Player.prototype.getSelectedPiecePos = function(){
  if(this.selectedPiece){
    return this.startingPos;
  }
  return null;
}
