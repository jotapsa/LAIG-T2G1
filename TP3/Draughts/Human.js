function Human(){
};

Human.checkValidMove = function(move, map){
  let forcedMoves;

  //Calculate forced moves for piece
  forcedMoves = Human.ObtainForcedMoves(move, map);

  return true;
}

Human.ObtainForcedMoves = function(move, map){
  let forcedMoves = [];
  let startingPos = move.getStartingPos();

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:{
      //Human.UpLeftCapture(startingPos, map);
      //Human.UpRightCapture(startingPos, map);
    }
    //trickle
    case CELL.BLACK_PIECE:{
      //Human.DownLeftCapture(startingPos, map);
      //Human.DownRightCapture(startingPos, map);
    }
    break;
    case CELL.WHITE_KING:{
      //Human.DownLeftCapture(startingPos, map);
      //Human.DownRightCapture(startingPos, map);
    }
    //trickle
    case CELL.WHITE_PIECE:{
      //Human.UpLeftCapture(startingPos, map);
      //Human.UpRightCapture(startingPos, map);
    }
    break;
    default:
    break;
  }

  return forcedMoves;
}

Human.UpLeftCapture = function(startingPos, map){
  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] < (map.getSizeN()-2)) && (startingPos[1]>2) &&
        (map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.WHITE_KING) &&
        (map.getPos(startingPos[0]+2, startingPos[1]-2)==CELL.EMPTY_SQUARE)){
          
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{

    }
    default:
    break;
  }
}
